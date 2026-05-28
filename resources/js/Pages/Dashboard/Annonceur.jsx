import Navbar from "@/Components/Navbar";
import { Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import AnnonceurCard from "@/Components/AnnonceurCard";

export default function Annonceur({ auth, annonces, flash }) {
    const user = auth.user;

    const [listeAnnonces, setListeAnnonces] = useState(annonces);
    const [filtreStatut, setFiltreStatut] = useState("tous");

    const supprimerAnnonce = (id) => {
        router.get(route("annonceur.destroy", id));
    };

    const onEdit = (id) => {
       router.get(route("annonceur.edit", id));
    };

    const onChangeStatut = (id, statut) => {
        router.get(route("annonceur.changerStatut", { id, statut })) ;
    };

    const annoncesFiltrees = listeAnnonces.filter(a => {
        if (filtreStatut === "tous") return true;
        return a.statut === filtreStatut;
    });

    return (
        <>
            <Navbar auth={auth} />
            <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white px-6 pt-24 pb-12 selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                {flash?.success && (
                    <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 relative z-10">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 relative z-10">
                        {flash.error}
                    </div>
                )}

                {user.is_verified ? (
                    <div className="relative z-10">
                        <Link href={route("annonceur.create")} className="inline-block px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 shadow-lg hover:shadow-xl transition-all">
                            Créer une annonce
                        </Link>

                        <div className="mt-6 flex items-center gap-4">
                            <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Filtrer par statut :</label>
                            <select value={filtreStatut} 
                                onChange={(e) => setFiltreStatut(e.target.value)}
                                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="tous" className="text-gray-900 dark:text-white">Tous</option>
                                <option value="en_attente" className="text-gray-900 dark:text-white">En attente</option>
                                <option value="confirmee" className="text-gray-900 dark:text-white">Confirmée</option>
                                <option value="terminee" className="text-gray-900 dark:text-white">Terminée</option>
                            </select>
                        </div>

                        <h1 className="text-3xl font-bold mt-8 mb-6 text-gray-900 dark:text-white">Mes annonces</h1>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {annoncesFiltrees.length === 0 ? (
                                <div className="col-span-full text-center p-8 bg-white dark:bg-slate-900/50 rounded-2xl border border-gray-200 dark:border-white/10">
                                    <p className="text-gray-500 dark:text-slate-400">
                                        Vous n'avez aucune annonce pour le moment.
                                    </p>
                                </div>
                            ) : (
                                annoncesFiltrees.map((a) => (
                                    <div key={a.id} className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col" >
                                        <AnnonceurCard annonce={a} onEdit={onEdit} onChangeStatut={onChangeStatut} onDeleteLocal={supprimerAnnonce}/>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-xl relative z-10">
                        <p>
                            Votre compte annonceur n'est pas encore vérifié.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}