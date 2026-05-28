import Navbar from "@/Components/Navbar";
import { Link, useForm } from "@inertiajs/react";

export default function EditAnnonce({ auth, annonce }) {
    const { data, setData, put, processing, errors } = useForm({
        titre: annonce.titre || "",
        description: annonce.description || "",
        quartier: annonce.quartier || "",
        date_action: annonce.date_action || "",
        min_participants: annonce.min_participants || 1,
        max_participants: annonce.max_participants || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("annonceur.update", annonce.id), data);
    };

    return (
        <>
            <Navbar auth={auth} />
            
            <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <main className="relative z-10 pt-24 pb-12 px-4 flex items-center justify-center min-h-screen">
                    
                    <div className="w-full max-w-lg">
                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 p-8 rounded-2xl shadow-xl">
                            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                Modifier l'annonce
                            </h1>

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Titre</label>
                                    <input type="text" value={data.titre}
                                        onChange={(e) => setData("titre", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"/>
                                    {errors.titre && <p className="text-red-500 text-sm mt-1">{errors.titre}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description</label>
                                    <textarea value={data.description} onChange={(e) => setData("description", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" rows="5" />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Quartier</label>
                                    <input type="text" value={data.quartier}
                                        onChange={(e) => setData("quartier", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"/>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Date de l'action</label>
                                    <input type="datetime-local" value={data.date_action} 
                                        onChange={(e) => setData("date_action", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"/>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Min</label>
                                        <input type="number" min="1" value={data.min_participants} onChange={(e) => setData("min_participants", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"/>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Max</label>
                                        <input type="number" min="1" value={data.max_participants}
                                            onChange={(e) => setData("max_participants", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"/>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-6">
                                    <button type="submit" disabled={processing}
                                        className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                        {processing ? "Modification en cours..." : "Modifier"}
                                    </button>
                                    <Link href={route("dashboard")} className="flex-1 px-4 py-3 bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-slate-300 font-medium rounded-xl hover:bg-gray-300 dark:hover:bg-white/10 text-center transition-all">
                                        Annuler
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}