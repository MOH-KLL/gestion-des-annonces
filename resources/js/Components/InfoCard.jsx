export default function InfoCard({ description, res }) {
    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow flex items-center justify-between">
            <span className="text-lg font-semibold">{description}</span>
            <span className="text-lg text-blue-600">{res}</span>
        </div>
    );
}