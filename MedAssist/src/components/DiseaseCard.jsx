import { useState } from 'react';

export default function DiseaseCard({ rank, disease, probability }) {
    const [description, setDescription] = useState("");
    const [showDescription, setShowDescription] = useState(false);

    const handleClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/disease-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "disease": disease }),
            });
            const data = await response.json();
            setDescription(data.description);
            setShowDescription(true);
        } catch (error) {
            console.error('Error fetching disease info:', error);
        }
    };

    return (
        <div 
            onClick={handleClick}
            className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        >
            <h3 className="font-bold text-lg">#{rank} {disease}</h3>
            <p className="text-gray-600">Probability: {probability}%</p>
            {showDescription && (
                <div className="mt-2 text-sm text-gray-700">
                    <p>{description}</p>
                </div>
            )}
        </div>
    );
}