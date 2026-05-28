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

    return (
        <div className="p-5 h-full flex flex-col">
            <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {annonce.titre}
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {annonce.description}
                </p>
                
                <div className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
                    <p>Quartier : {annonce.quartier}</p>
                    <p>Date : {new Date(annonce.date_action).toLocaleString()}</p>
                    <p>Participants : {annonce.min_participants} - {annonce.max_participants}</p>
                    <p>Statut : 
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            annonce.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            annonce.statut === 'confirmee' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                        }`}>
                            {annonce.statut}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                {annonce.statut === "en_attente" && (
                    <>
                        <button
                            onClick={() => router.visit(route("annonceur.edit", annonce.id))}
                            className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                        >
                            Modifier
                        </button>
                        <button
                            onClick={() => confirmer(annonce.id)}
                            className="px-3 py-1.5 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                        >
                            Confirmer
                        </button>
                        <Link 
                            href={route("annonceur.participants", annonce.id)} 
                            className="px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors inline-block"
                        >
                            Participants
                        </Link>
                    </>
                )}
                
                <button 
                    onClick={() => supprimer(annonce.id)} 
                    className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                >
                    Supprimer
                </button>

                {annonce.statut === "confirmee" && (
                    <Link 
                        href={route('annonceur.presence', annonce.id)}
                        className="px-3 py-1.5 text-xs font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
                    >
                        Terminer
                    </Link>
                )}
            </div>
        </div>
    );
}