import Navbar from "@/Components/Navbar";
import { router } from "@inertiajs/react";
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
        <h1 className="text-3xl">Mes participants :</h1><br /><br />
        <p className="text-2xl">Vous aurez ici la liste des participants dans votre annonce :</p><br /><br />
        <table className="w-4/5 mx-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="border px-4 py-2">Nom</th>
                    <th className="border px-4 py-2">Score civique</th>
                    <th className="border px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
               {listeCitoyens.length === 0 ? (
                    <tr>
                        <td colSpan="3" className="text-center text-red-600 py-4">
                            Vous n'avez aucun participant ici !!
                        </td>
                    </tr>
                ) : (
                    listeCitoyens.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="border px-4 py-2">{c.nom}</td>
                            <td className="border px-4 py-2">{c.score}</td>
                            <td className="border px-4 py-2 text-center">
                                <button onClick={() => supprimerCitoyen(c.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
        </>
    );
}
