import Navbar from "@/Components/Navbar";
import { Head, useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function Presence({ auth, annonce, participants }) {
    const { data, setData, post, processing } = useForm({
        presences: participants.map(p => ({
            user_id: p.user_id,
            est_present: p.est_present ?? false,
        })),
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('annonceur.presenceStore', annonce.id));
    };

    return (
        <>
            <Head title="Présence des participants" />
            
            <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <Navbar auth={auth} />

                <main className="relative z-10 pt-24 pb-12 px-4 max-w-3xl mx-auto">
                    
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Présence des participants
                            </h1>
                            <p className="text-gray-600 dark:text-slate-400 mt-1">
                                {annonce.titre}
                            </p>
                        </div>
                        <Link href={route('dashboard')} 
                            className="px-4 py-2 bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-slate-300 rounded-xl hover:bg-gray-300 dark:hover:bg-white/10 transition-colors">
                            Retour
                        </Link>
                    </div>
                    <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                        <p className="text-sm">
                            <strong>Points :</strong> Present = +20, Absent = -15, Bonus annonceur = +5
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Citoyen</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-slate-400">Present ?</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-slate-400">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {participants.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-8 text-center text-gray-500 dark:text-slate-400">
                                                Aucun participant.
                                            </td>
                                        </tr>
                                    ) : (
                                        data.presences.map((presence, index) => (
                                            <tr key={presence.user_id} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                                                <td className="px-4 py-3 text-gray-900 dark:text-white">
                                                    {participants[index].nom}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" checked={presence.est_present}
                                                            onChange={(e) => {
                                                                const newPresences = [...data.presences];
                                                                newPresences[index].est_present = e.target.checked;
                                                                setData('presences', newPresences);
                                                            }}
                                                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800"/>
                                                    </label>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        presence.est_present 
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}>
                                                        {presence.est_present ? '+20' : '-15'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <button  type="submit" disabled={processing} className="w-full mt-6 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            {processing ? 'Enregistrement...' : 'Enregistrer les présences'}
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
}