
export default function SymptomCard({ setSelected, selected, symptom, currIdx }, props) {

    const handleClick = () => {
        setSelected(prev => (
            prev.map((i, index) => {
                if (index === currIdx) {
                    return i === 1 ? 0 : 1;
                }
                return i;
            })
        ));
    }

    return (
        <button
            className={`p-4 border border-gray-300 rounded-md shadow-md text-gray-800 transition duration-75 transform hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
            ${selected && selected[currIdx] === 1 ? "bg-blue-700 text-white" : "bg-white"}`}
            onClick={handleClick}
        >
            {
                symptom
            }
        </button>
    )
}