export default function InscriptionCard({ inscription, annuler }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between">
            <h5 className="text-2xl font-bold  text-black dark:text-white mb-8">
               Titre :  {inscription.annonce.titre}
            </h5>
            <p className="text-base text-gray-700 dark:text-gray-300 mb-3">
                Description : {inscription.annonce.description}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
             Quartier : <span className="font-medium">{inscription.annonce.quartier}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                 Date : <span className="font-medium">
                    {new Date(inscription.annonce.date_action).toLocaleDateString()}
                </span>
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                 Statut : <span className="font-semibold">{inscription.status}</span>
            </p>
            <button onClick={() => annuler(inscription.id)} className="mt-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Annuler mon inscription
            </button>
        </div>
    );
}