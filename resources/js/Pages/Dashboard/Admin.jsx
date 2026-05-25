import Navbar from "@/Components/Navbar";
import { Head, router } from "@inertiajs/react";

export default function Admin({ users, annonces, inscriptions, auth }) {

    const citoyens = users.filter((u) => u.role === "citoyen");
    const annonceurs = users.filter((u) => u.role === "annonceur");

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Head title="Dashboard Admin" />
            <Navbar auth={auth} />

            <div className="p-8 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
                    Espace Admin : 
                </h1>

            <div className="mb-8">
        <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
            Citoyens ({citoyens.length})
        </h2>
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="border px-4 py-2">Nom</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Score civique</th>
                    <th className="border px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {citoyens.map((c) => {
                    let scoreClass = "text-black dark:text-white";
                    if (c.score_civique < 0) scoreClass = "text-red-600 font-bold";
                    else if (c.score_civique === 0) scoreClass = "text-orange-500 font-semibold";
                    else if (c.score_civique > 20) scoreClass = "text-green-600 font-bold";
                    return (
                        <tr key={c.id}>
                            <td className="border px-4 py-2">{c.name}</td>
                            <td className="border px-4 py-2">{c.email}</td>
                            <td className={`border px-4 py-2 ${scoreClass}`}>
                                {c.score_civique}
                            </td>
                            <td className="border px-4 py-2 text-center">
                            <button onClick={() => {
                                    if (confirm("Voulez-vous supprimer ce citoyen ?")) {
                                        router.delete(route("admin.supprimerCitoyen", c.id));
                                    }
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                                Supprimer
                            </button>
                        </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    <div className="mb-8">
        <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
            Annonceurs ({annonceurs.length})
        </h2>
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="border px-4 py-2">Nom</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Vérifié</th>
                    <th className="border px-4 py-2">Document</th>
                    <th className="border px-4 py-2">vérifier</th>
                    <th className="border px-4 py-2">rejeter</th> 
                    <th className="border px-4 py-2">supprimer</th> 
                </tr>
            </thead>
            <tbody>
                {annonceurs.map((a) => (
                    <tr key={a.id}>
                        <td className="border px-4 py-2">{a.name}</td>
                        <td className="border px-4 py-2">{a.email}</td>
                        <td className="border px-4 py-2">
                            {a.is_verified ? "✅ Oui" : "❌ Non"}
                        </td>
                    <td className="border px-4 py-2">
                                {a.document_identite ? (
                                    <a href={`/storage/${a.document_identite}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        Voir fichier
                                    </a>
                                ) : (
                                    <span className="text-gray-500">Non fourni</span>
                                )}
                            </td>
                            <td className="border px-4 py-2 text-center">
                                <button onClick={() => router.put(route("admin.confirmerAnnonceur", a.id))} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                                    Confirmer
                                </button>
                            </td>
                        <td className="border px-4 py-2 text-center">
                            <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={() =>
                                    router.put(route("admin.rejeterAnnonceur", a.id))
                                } >
                                Rejeter
                            </button>
                        </td>
                        <td className="border px-4 py-2 text-center">
                            <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={() => {
                                    if (confirm("Voulez-vous supprimer cet annonceur ?")) {
                                        router.delete(route("admin.supprimerAnnonceur", a.id));
                                    }
                                }}>
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

     <div className="mb-8">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                        Annonces ({annonces.length})
            </h2>
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="border px-4 py-2">Titre</th>
                                <th className="border px-4 py-2">Quartier</th>
                                <th className="border px-4 py-2">Statut</th>
                                <th className="border px-4 py-2">supprimer l annonce</th>
                        </tr>
                    </thead>
                    <tbody>
                            {annonces.map((a) => (
                                <tr key={a.id}>
                                    <td className="border px-4 py-2">{a.titre}</td>
                                    <td className="border px-4 py-2">{a.quartier}</td>
                                    <td className="border px-4 py-2">{a.statut}</td>
                                    <td className="border px-4 py-2 text-center">
                                            <button onClick={() => {
                                                    if (confirm("Voulez-vous supprimer cette annonce ?")) {
                                                        router.delete(route("admin.supprimerAnnonce", a.id));
                                                    }
                                                }}
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                                                Supprimer
                                            </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                        Inscriptions ({inscriptions.length})
                    </h2>
                    <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="border px-4 py-2">Citoyen</th>
                                <th className="border px-4 py-2">Annonce</th>
                                <th className="border px-4 py-2">Statut</th>
                                <th className="border px-4 py-2">supprimer inscription</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inscriptions.map((i) => (
                                <tr key={i.id}>
                                    <td className="border px-4 py-2">{i.user?.name || i.citoyen?.name}</td>
                                    <td className="border px-4 py-2">{i.annonce?.titre}</td>
                                    <td className="border px-4 py-2">{i.status}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            onClick={() => {
                                                if (confirm("Voulez-vous supprimer cette inscription ?")) {
                                                    router.delete(route("admin.supprimerInscription", i.id));
                                                }
                                            }}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}