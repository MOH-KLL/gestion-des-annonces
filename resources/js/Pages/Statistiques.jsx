import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";

export default function Statistiques({ auth, stats }) {
    return (
        <>
            <Head title="Statistiques" />
            
            <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <Navbar auth={auth} />

                <main className="relative z-10 pt-24 pb-12 px-4 max-w-6xl mx-auto">
                    
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Statistiques
                        </h1>
                        <Link href={route('dashboard')} className="px-4 py-2 bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-slate-300 rounded-xl hover:bg-gray-300 dark:hover:bg-white/10 transition-colors">
                            Retour
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Utilisateurs
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">Total</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.utilisateurs.total}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">Citoyens</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.utilisateurs.citoyens}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">Annonceurs</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.utilisateurs.annonceurs}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">Admins</p>
                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.utilisateurs.admins}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Annonces
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">Total</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.annonces.total}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">En attente</p>
                                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.annonces.en_attente}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">Confirmées</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.annonces.confirmees}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">Terminées</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.annonces.terminees}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Inscriptions
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">Total</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.inscriptions.total}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">En attente</p>
                                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.inscriptions.en_attente}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">Confirmées</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.inscriptions.confirmees}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 dark:text-slate-400">Annulées</p>
                                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.inscriptions.annulees}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Score Civique
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Total</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.score.total}</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Moyen</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.score.moyen}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Annonceurs
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Vérifiés</p>
                                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.annonceurs.verifies}</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Non vérifiés</p>
                                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.annonceurs.non_verifies}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}