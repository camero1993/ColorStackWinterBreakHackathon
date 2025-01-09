export default function DiseaseCard({ rank, disease, probability }) {
    return (
        <div
            className={`p-4 bg-white border border-gray-300 rounded-md shadow-md text-gray-800 transition duration-75 transform shadow-lg active:scale-95 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
        >
            <h2 className="text-lg font-bold">#{rank}: {disease}</h2>
            <p className="text-sm text-gray-600">Probability: {(probability * 100).toFixed(2)}%</p>
        </div>
    );
}
