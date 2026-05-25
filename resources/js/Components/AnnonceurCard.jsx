import { router, Link } from "@inertiajs/react";

export default function AnnonceurCard({ annonce, onDeleteLocal }) {
    const supprimer = (id) => {
        if (confirm("Voulez-vous vraiment supprimer cette annonce ?")) {
            router.delete(route("annonceur.destroy", id), {
                onSuccess: () => {
                    onDeleteLocal(id);
                },
            });
        }
    };

    const confirmer = (id) => {
        if (confirm("Voulez-vous confirmer cette annonce ?")) {
            router.put(route("annonceur.confirmer", id));
        }
    };

    const terminer = (id) => {
        if (confirm("Voulez-vous terminer cette annonce ?")) {
            router.put(route("annonceur.terminer", id));
        }
    };

    return (
        <div>
            <div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">Titre : {annonce.titre}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Description : {annonce.description}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300"> Quartier : {annonce.quartier}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Date {new Date(annonce.date_action).toLocaleString()}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Min{annonce.min_participants} - Max{annonce.max_participants}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300"> Statut : {annonce.statut}</p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
                {annonce.statut === "en_attente" && (
                    <>
                        <button
                            onClick={() => router.visit(route("annonceur.edit", annonce.id))}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                            Modifier
                        </button>
                        <button
                            onClick={() => confirmer(annonce.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                            Confirmer
                        </button>

                        <Link href={route("annonceur.participants", annonce.id)} className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                            Voir participants
                        </Link>
                    </>
                )}
                <button onClick={() => supprimer(annonce.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Supprimer
                </button>

                {annonce.statut === "confirmee" && (
                    <button onClick={() => terminer(annonce.id)} className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
                        Terminer
                    </button>
                )}
            </div>
        </div>
    );
}