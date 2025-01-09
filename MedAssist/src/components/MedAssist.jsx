import ReactLoading from 'react-loading';
import { useState } from "react";
import SymptomCard from "./SymptomCard.jsx";
import DiseaseCard from "./DiseaseCard.jsx";

export default function MedAssist(props) {

    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSymptoms, setShowSymptoms] = useState(false);
    const [showCause, setShowCause] = useState(true);

    const [selected, setSelected] = useState([0,0,0]);
    const [found, setFound] = useState([' acidity',' altered_sensorium', ' anxiety',]);
    const [causes, setCauses] = useState(['Fungal infection','Allergy', 'GERD',]);

    const handleFindSymptoms = () => {
        setIsLoading(true);
        setShowSymptoms(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
    }

    const symptoms = found.map((s, index) => {
        return <SymptomCard key={index} currIdx={index} symptom={s} setSelected={setSelected} selected={selected} />
    });

    const foundCauses = causes.map((d, index) => {
        return <DiseaseCard key={index} />
    })

    return (
        <div
            className="relative min-h-screen bg-[rgb(128,178,214)] bg-no-repeat p-8 overflow-hidden flex flex-col items-center gao-5"
        >
            <div className="bg-[url('assets/signup_no_background.png')] bg-contain bg-no-repeat w-screen h-screen absolute left-5 pointer-events-none z-10 overflow-hidden"></div>
            <div
                className="mt-5 h-1/2 w-1/2 z-20 flex flex-col items-center gap-5"
            >
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Explain your symptoms"
                    className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 resize-none"
                />
                <button
                    className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-200 disabled:bg-gray-500 disabled:text-white/80 disabled:cursor-not-allowed"
                    onClick={handleFindSymptoms}
                    disabled={isLoading}
                >
                    Find Symptoms
                </button>
            </div>
            {
                showSymptoms &&
                <div className="mt-8 flex flex-col items-center">
                    <p className="text-lg font-semibold text-gray-700">Selected the correct symptoms</p>
                    <div className="flex gap-5 mt-8">
                        {symptoms}
                    </div>
                </div>
            }
            {
                showCause &&
                <div className="mt-8 flex flex-col items-center">
                    <p className="text-lg font-semibold text-gray-700">Top 5 Most likely Causes:</p>

                    <div className="flex gap-5 mt-8">
                        {foundCauses}
                    </div>
                </div>
            }
        </div>
    )
}