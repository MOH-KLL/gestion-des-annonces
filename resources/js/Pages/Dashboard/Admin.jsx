import Navbar from "@/Components/Navbar";
import { Head, router, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Admin({ users, annonces, inscriptions, auth }) {

    const citoyens = users.filter((u) => u.role === "citoyen");
    const annonceurs = users.filter((u) => u.role === "annonceur");

    const [searchCitoyen, setSearchCitoyen] = useState("");
    const [searchAnnonceur, setSearchAnnonceur] = useState("");

    const citoyensFiltres = citoyens.filter(c => {
        if (searchCitoyen === "") return true;
        return c.name.toLowerCase().includes(searchCitoyen.toLowerCase()) ||
               c.email.toLowerCase().includes(searchCitoyen.toLowerCase());
    });

    const annonceursFiltres = annonceurs.filter(a => {
        if (searchAnnonceur === "") return true;
        return a.name.toLowerCase().includes(searchAnnonceur.toLowerCase()) ||
               a.email.toLowerCase().includes(searchAnnonceur.toLowerCase());
    });

    return (
        <>
            <Head title="Dashboard Admin" />
            <Navbar auth={auth} />
            
            <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <main className="relative z-10 pt-24 pb-12 px-4 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8 gap-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            Espace Admin
                        </h1>
                        <Link href={route('statistiques')} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 shadow-lg hover:shadow-xl transition-all">
                            Statistiques
                        </Link>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Citoyens ({citoyensFiltres.length})
                        </h2>
                        
                        <div className="mb-4">
                            <input type="text" placeholder="Rechercher par nom ou email..." value={searchCitoyen} onChange={(e) => setSearchCitoyen(e.target.value)}
                                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white w-full max-w-md"/>
                        </div>

                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Nom</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Email</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Score civique</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-slate-400">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {citoyensFiltres.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-8 text-center text-gray-500 dark:text-slate-400">
                                                Aucun citizen trouve.
                                            </td>
                                        </tr>
                                    ) : (
                                        citoyensFiltres.map((c) => {
                                            let scoreClass = "text-gray-900 dark:text-white";
                                            if (c.score_civique < 0) scoreClass = "text-red-600 dark:text-red-400 font-bold";
                                            else if (c.score_civique === 0) scoreClass = "text-orange-500 font-semibold";
                                            else if (c.score_civique > 20) scoreClass = "text-green-600 dark:text-green-400 font-bold";
                                            return (
                                                <tr key={c.id} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                                                    <td className="px-4 py-3">{c.name}</td>
                                                    <td className="px-4 py-3 text-gray-600 dark:text-slate-400">{c.email}</td>
                                                    <td className={`px-4 py-3 ${scoreClass}`}>{c.score_civique}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button 
                                                            onClick={() => {
                                                                if (confirm("Voulez-vous supprimer ce citoyen ?")) {
                                                                    router.delete(route("admin.supprimerCitoyen", c.id));
                                                                }
                                                            }}
                                                            className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-500 text-sm font-medium transition-colors">
                                                            Supprimer
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Annonceurs ({annonceursFiltres.length})
                        </h2>
                        <div className="mb-4">
                            <input type="text" placeholder="Rechercher par nom ou email..."value={searchAnnonceur}
                                onChange={(e) => setSearchAnnonceur(e.target.value)}
                                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white w-full max-w-md"/>
                        </div>

                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Nom</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Email</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Verifie</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Document</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-slate-400" colSpan={3}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {annonceursFiltres.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-8 text-center text-gray-500 dark:text-slate-400">
                                                Aucun annonceur trouve.
                                            </td>
                                        </tr>
                                    ) : (
                                        annonceursFiltres.map((a) => (
                                            <tr key={a.id} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                                                <td className="px-4 py-3">{a.name}</td>
                                                <td className="px-4 py-3 text-gray-600 dark:text-slate-400">{a.email}</td>
                                                <td className="px-4 py-3">
                                                    {a.is_verified ? 
                                                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">Oui</span> : 
                                                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs rounded-full">Non</span>
                                                    }
                                                </td>
                                                <td className="px-4 py-3">
                                                    {a.document_identite ? (
                                                        <Link href={`/storage/${a.document_identite}`} target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                                                            Voir
                                                        </Link>
                                                    ) : (
                                                        <span className="text-gray-500 dark:text-slate-500 text-sm">Non fourni</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <button onClick={() => router.put(route("admin.confirmerAnnonceur", a.id))} className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-500 text-sm font-medium transition-colors mr-2">
                                                        Confirmer
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <button onClick={() => router.put(route("admin.rejeterAnnonceur", a.id))} className="px-3 py-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-500 text-sm font-medium transition-colors mr-2">
                                                        Rejeter
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <button onClick={() => {
                                                        if (confirm("Voulez-vous supprimer cet annonceur ?")) {
                                                            router.delete(route("admin.supprimerAnnonceur", a.id));
                                                        }
                                                    }} className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-500 text-sm font-medium transition-colors">
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Annonces ({annonces.length})
                        </h2>
                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Titre</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Quartier</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Statut</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-slate-400">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {annonces.map((a) => (
                                        <tr key={a.id} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                                            <td className="px-4 py-3">{a.titre}</td>
                                            <td className="px-4 py-3 text-gray-600 dark:text-slate-400">{a.quartier}</td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                                                    {a.statut}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button onClick={() => {
                                                    if (confirm("Voulez-vous supprimer cette annonce ?")) {
                                                        router.delete(route("admin.supprimerAnnonce", a.id));
                                                    }
                                                }} className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-500 text-sm font-medium transition-colors">
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Inscriptions ({inscriptions.length})
                        </h2>
                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Citoyen</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Annonce</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Statut</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-slate-400">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inscriptions.map((i) => (
                                        <tr key={i.id} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                                            <td className="px-4 py-3">{i.user?.name || i.citoyen?.name}</td>
                                            <td className="px-4 py-3 text-gray-600 dark:text-slate-400">{i.annonce?.titre}</td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full">
                                                    {i.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button onClick={() => {
                                                    if (confirm("Voulez-vous supprimer cette inscription ?")) {
                                                        router.delete(route("admin.supprimerInscription", i.id));
                                                    }
                                                }} className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-500 text-sm font-medium transition-colors">
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}