export default function ValueCard({ icone, titre, description }) {
    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                            <span className="text-3xl">{icone}</span>
                            <h3 className="text-xl font-semibold mt-2">{titre}</h3>
                            <p className="text-sm mt-2">{description}</p>
        </div>
    );
}