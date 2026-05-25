export default function AnnonceCards({ annonce, inscrire, dejaInscrit }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-bold text-black dark:text-white">{annonce.titre}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Description : <strong>{annonce.description}</strong> </p>
            <p className="text-sm text-gray-700 dark:text-gray-300"> Quartier :  <strong>{annonce.quartier}</strong></p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
                Date : <strong> {new Date(annonce.date_action).toLocaleDateString()} </strong>
            </p>
            <button onClick={() => inscrire(annonce.id)} disabled={dejaInscrit} className={`mt-4 px-3 py-1 rounded text-white ${dejaInscrit ? "bg-gray-400" : "bg-blue-600"}`}>
                {dejaInscrit ? "Déjà inscrit" : "S'inscrire"}
            </button>
        </div>
    );
}