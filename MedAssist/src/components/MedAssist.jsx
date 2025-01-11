import ReactLoading from 'react-loading';
import { useState } from "react";
import SymptomCard from "./SymptomCard.jsx";
import DiseaseCard from "./DiseaseCard.jsx";

export default function MedAssist(props) {

    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSymptoms, setShowSymptoms] = useState(false);
    const [showCause, setShowCause] = useState(false);

    const [selected, setSelected] = useState([]);
    const [found, setFound] = useState([]);
    const [causes, setCauses] = useState([]);

    const handleFindSymptoms = async () => {
        setIsLoading(true);
        fetch('http://127.0.0.1:8000/api/symptoms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"symptoms": text}),
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                const cleanData = data.map(item => item.symptom.trim());
                setFound(cleanData);
                setSelected(Array(cleanData.length).fill(0))
                setIsLoading(false);
                setShowSymptoms(true);
            })
    }

    const handleFindDiseases = async () => {
        setIsLoading(true);
        fetch('http://127.0.0.1:8000/api/disease', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"symptoms": text}),
        })
            .then(res => res.json())
            .then(data => {
                setCauses(data);
                console.log(data)
                setShowCause(true);
                setIsLoading(false);x
            })
    }

    const symptoms = found.map((s, index) => {
        return <SymptomCard key={index} currIdx={index} symptom={s} setSelected={setSelected} selected={selected} />
    });

    const foundCauses = causes.map((d, index) => {
        return (
            <DiseaseCard
                key={index}
                rank={d.rank}
                disease={d.disease}
                probability={d.probability}
            />
        );
    });


    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-500 p-8">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
                <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Describe your symptoms in detail..."
                        className="w-full h-48 p-6 border border-gray-200 rounded-xl shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 resize-none"
                    />
                    
                    <button
                        className="mt-4 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:hover:transform-none"
                        onClick={handleFindSymptoms}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Analyzing...' : 'Find Symptoms'}
                    </button>
                </div>

                {showSymptoms && (
                    <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Select Your Symptoms</h3>
                        <div className="flex flex-wrap gap-4">
                            {symptoms}
                        </div>
                        <button
                            className="px-6 py-3 mt-8 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-200 disabled:bg-gray-500 disabled:text-white/80 disabled:cursor-not-allowed"
                            onClick={handleFindDiseases}
                            disabled={isLoading}
                        >
                            Find Diseases
                        </button>
                    </div>
                )}

                {showCause && (
                    <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Potential Causes</h3>
                        <div className="flex flex-wrap gap-4">
                            {foundCauses}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}