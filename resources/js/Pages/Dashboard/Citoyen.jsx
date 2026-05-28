import { Head, useForm, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import AnnonceCards from '@/Components/AnnonceCards';
import { useState } from 'react';

export default function Citoyen({ auth, annonces, inscriptions, score }) {
    const { post, delete: destroy } = useForm();

    const [filtreQuartier, setFiltreQuartier] = useState("tous");
    const [search, setSearch] = useState("");

    const quartiers = [...new Set(annonces.map(a => a.quartier))];

    const inscrire = (annonceId) => {
        post(route('inscription.store', annonceId));
    };

    const annulerToutes = () => {
        if (confirm("Voulez-vous annuler toutes vos inscriptions en attente ?")) {
            destroy(route('inscription.annulerToutes'));
        }
    };

    const annoncesFiltrees = annonces.filter(a => {
        if (filtreQuartier === "tous") return true;
        return a.quartier === filtreQuartier;
    }).filter(a => {
        if (search === "") return true;
        return a.titre.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <Head title='Citoyen'/>
            <Navbar auth={auth} />
            
            <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <main className="relative z-10 pt-24 pb-12 px-4 max-w-6xl mx-auto">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Bonjour, {auth.user.name}
                        </h1>
                        
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link 
                                href={route('citoyen.inscriptions')} 
                                className="px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-500 transition-colors">
                                Mes inscriptions
                            </Link>
                            <button onClick={annulerToutes} disabled={inscriptions.length === 0}
                                className={`px-4 py-2 font-medium rounded-xl transition-colors ${
                                    inscriptions.length === 0 
                                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                                    : 'bg-red-600 text-white hover:bg-red-500'}`} >
                                Annuler toutes mes inscriptions
                            </button>
                            <span className="px-4 py-2 bg-blue-600 text-white font-medium rounded-xl flex items-center gap-2">
                                Score civique : <span className="font-bold">{score}</span> ⭐
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Rechercher :</label>
                            <input type="text" placeholder="Rechercher par titre..." value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"/>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Quartier :</label>
                            <select value={filtreQuartier} onChange={(e) => setFiltreQuartier(e.target.value)}
                                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="tous" className="text-gray-900 dark:text-white">Tous</option>
                                {quartiers.map(q => (
                                    <option key={q} value={q} className="text-gray-900 dark:text-white">{q}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {annoncesFiltrees.length === 0 ? (
                            <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900/50 rounded-2xl border border-gray-200 dark:border-white/10">
                                <p className="text-gray-500 dark:text-slate-400">
                                    Aucune annonce disponible pour le moment.
                                </p>
                            </div>
                        ) : (
                            annoncesFiltrees.map((a) => (
                                <AnnonceCards key={a.id} annonce={a} inscrire={inscrire} dejaInscrit={inscriptions.some(i => i.annonce_id === a.id)}/>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}