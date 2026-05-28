import Navbar from "@/Components/Navbar";
import { router, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Participants({ annonce, citoyens, auth }) {
    const [listeCitoyens, setCitoyens] = useState(citoyens);

    const supprimerCitoyen = (inscriptionId) => {
        if (confirm("Voulez-vous supprimer ce citoyen de l'annonce ?")) {
            router.delete(route("annonceur.supprimerCitoyen", { annonce: annonce.id, inscription: inscriptionId }), {
                onSuccess: () => {
                    setCitoyens((prev) => prev.filter((c) => c.id !== inscriptionId));
                },
            });
        }
    };

    return (
        <>
            <Navbar auth={auth} />
            
            <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <main className="relative z-10 pt-24 pb-12 px-4 max-w-5xl mx-auto">
                    
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Participants
                        </h1>
                        <p className="text-gray-600 dark:text-slate-400">
                            Liste des participants pour l'annonce : <span className="font-semibold text-blue-600 dark:text-blue-400">{annonce.titre}</span>
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Nom</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Score civique</th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-slate-400">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listeCitoyens.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center text-gray-500 dark:text-slate-400">
                                            Vous n'avez aucun participant pour le moment.
                                        </td>
                                    </tr>
                                ) : (
                                    listeCitoyens.map((c) => (
                                        <tr key={c.id} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{c.nom}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                                                    {c.score}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => supprimerCitoyen(c.id)} 
                                                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-500 transition-colors"
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6">
                        <Link 
                            href={route("dashboard")} 
                            className="inline-flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Retour au dashboard
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
}