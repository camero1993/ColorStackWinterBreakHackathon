import heapq
import numpy as np
import os
import pandas as pd
import requests
import spacy
import torch
import torch.nn.functional as F
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.base import BaseEstimator, ClassifierMixin
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBClassifier
from fastapi.middleware.cors import CORSMiddleware
# !python -m spacy download en_core_web_sm  # if not already installed


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all HTTP headers
)

data_file = "/Users/davidjuarez/PycharmProjects/ColorStackWinterBreakHackathon/app/symptom_dataset/DiseaseAndSymptoms.csv"

# pre-trained SBERT model
model = SentenceTransformer('all-MiniLM-L6-v2')

# spaCy model for tokenization
nlp = spacy.load("en_core_web_sm")


class Symptoms(BaseModel):
    symptoms: str


def setup():
    print('creating model')
    df = pd.read_csv(
        "/Users/davidjuarez/PycharmProjects/ColorStackWinterBreakHackathon/app/symptom_dataset/DiseaseAndSymptoms.csv")

    symptom_cols = ['Symptom_1', 'Symptom_2', 'Symptom_3', 'Symptom_4', 'Symptom_5', 'Symptom_6']

    all_symptoms_set = set()
    for col in symptom_cols:
        df[col] = df[col].astype(str).fillna('missing_symptom')
        all_symptoms_set.update(df[col].unique())

    if 'nan' in all_symptoms_set:
        all_symptoms_set.remove('nan')
    if 'None' in all_symptoms_set:
        all_symptoms_set.remove('None')

    all_symptoms = sorted(list(all_symptoms_set))

    # multi hot encoding - creates a vec of 1's and 0's
    def row_to_vector(row):
        row_symptoms = set(s for s in row if s != 'missing_symptom')
        return [1 if symptom in row_symptoms else 0 for symptom in all_symptoms]

    vectors = df[symptom_cols].apply(row_to_vector, axis=1)

    X = pd.DataFrame(vectors.tolist(), columns=all_symptoms)

    # encode the diseases
    label_encoder_y = LabelEncoder()
    y = label_encoder_y.fit_transform(df['Disease'])

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    class SklearnXGBClassifier(BaseEstimator, ClassifierMixin):
        def __init__(self, **kwargs):
            self.model = XGBClassifier(**kwargs)

        def fit(self, X, y, **kwargs):
            self.model.fit(X, y, **kwargs)
            return self

        def predict(self, X):
            return self.model.predict(X)

        def predict_proba(self, X):
            return self.model.predict_proba(X)

        def get_params(self, deep=True):
            return self.model.get_params(deep)

        def set_params(self, **params):
            self.model.set_params(**params)
            return self

    model = SklearnXGBClassifier(
        objective='multi:softmax',
        num_class=42,
        use_label_encoder=False,
        eval_metric='logloss'
    )

    model.fit(X_train, y_train)

    return model, label_encoder_y, all_symptoms


disease_model, label_encoder_y, all_symptoms = setup()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/api/disease")
def disease(symptoms: Symptoms):

    res = requests.post("http://127.0.0.1:8000/api/symptoms", json={"symptoms": symptoms.symptoms})
    symptoms_json = res.json()

    new_model = disease_model
    test_symptoms = [item['symptom'] for item in symptoms_json]

    test_vec = [1 if symptom in test_symptoms else 0 for symptom in all_symptoms]

    test_vec_df = pd.DataFrame([test_vec], columns=all_symptoms)

    probs = new_model.predict_proba(test_vec_df)

    sorted_indices = np.argsort(probs[0])[::-1]

    top_n = 5
    top_n_indices = sorted_indices[:top_n]

    results = []
    for i, disease_idx in enumerate(top_n_indices, start=1):
        disease_name = label_encoder_y.inverse_transform([disease_idx])[0]
        probability = float(probs[0][disease_idx])
        results.append({
            "rank": i,
            "disease": disease_name,
            "probability": probability
        })

    return results


@app.post("/api/symptoms")
def symptom(symptoms: Symptoms):

    # Step 1: Preprocess the input
    clauses = preprocess_input(symptoms.symptoms)
    predefined_symptoms = process_csv(data_file)

    # Step 2: Tokenize and Lemmatize the clauses
    processed_input = process_clauses(clauses, create_dict=False)
    processed_symptoms, correlation = process_clauses(predefined_symptoms, create_dict=True)

    # Step 3: Compare each clause to predefined symptoms using SBERT
    results = compare_input_to_symptoms(processed_input, processed_symptoms, correlation, threshold=0.6, top_n=4)

    return JSONResponse(content=results)


# preprocess input from the user
def preprocess_input(user_input):
    user_input = user_input.lower().strip()
    clauses = [clause.strip() for clause in user_input.split(",") if clause.strip()]
    return clauses


# process clauses of user input
def process_clauses(clauses, create_dict=True, lemmatize=True):
    print("Processing clauses")

    symptom_correlation = {} if create_dict else None
    processed_clauses = []

    for clause in clauses:
        clause_p = clause.replace("_", " ")
        doc = nlp(clause_p)

        processed_clause = " ".join([token.lemma_ for token in doc if token.is_alpha and not token.is_stop])

        if create_dict:
            symptom_correlation[processed_clause] = clause

        processed_clauses.append(processed_clause)

    if create_dict:
        return processed_clauses, symptom_correlation
    else:
        return processed_clauses


def process_csv(filepath):
    df = pd.read_csv(filepath)

    predefined_symptoms = set()

    for col in df.columns[1:19]:
        for value in df[col].unique():
            # Add the cleaned symptom to the set
            predefined_symptoms.add(str(value))

    return list(predefined_symptoms)


def get_sbert_embeddings(sentences):
    """
    Generate SBERT embeddings for a list of sentences.

    Args:
        sentences (list of str): List of input sentences.

    Returns:
        torch.Tensor: Embedding tensor of shape (batch_size, hidden_size).
    """
    if isinstance(sentences, str):
        sentences = [sentences]  # Ensure input is a list

    # Directly encode the sentences
    embeddings = model.encode(sentences, convert_to_tensor=True)  # Output shape: (batch_size, hidden_size)
    return embeddings


# Function to compute pairwise cosine similarity
def cosine_similarity_matrix(embeddings1, embeddings2):
    return torch.mm(F.normalize(embeddings1, p=2, dim=1), F.normalize(embeddings2, p=2, dim=1).T)


# Function to find the most similar predefined symptoms for each clause
def compare_input_to_symptoms(clauses, predefined_symptoms, correlation, threshold=0.6, top_n=4):
    print("Comparing...")
    clause_embeddings = get_sbert_embeddings(clauses)
    symptom_embeddings = get_sbert_embeddings(predefined_symptoms)

    # Compute similarity matrix
    similarity_matrix = cosine_similarity_matrix(clause_embeddings, symptom_embeddings)

    # Process each clause and its similarities to symptoms

    symptom_results = []  # List to hold all symptoms above the threshold

    for i, clause in enumerate(clauses):
        # Get similarity scores for the current clause
        similarities = similarity_matrix[i]

        # Use a min-heap to maintain top_n elements
        top_similar_symptoms = []
        for j, similarity in enumerate(similarities):
            if similarity >= threshold:
                if len(top_similar_symptoms) < top_n:
                    heapq.heappush(top_similar_symptoms, (similarity, predefined_symptoms[j]))
                else:
                    heapq.heappushpop(top_similar_symptoms, (similarity, predefined_symptoms[j]))

        # Extract the top elements from the heap (sorted in descending order by similarity)
        top_similar_symptoms.sort(reverse=True, key=lambda x: x[0])

        # Display and collect matched symptoms
        print(f"Clause: '{clause}'")
        for similarity, symptom in top_similar_symptoms:
            raw_symptom = correlation.get(symptom, symptom)
            print(f"  - Symptom: '{raw_symptom}' - Similarity: {similarity:.2f}")
            symptom_results.append({"symptom": raw_symptom})

    return symptom_results
