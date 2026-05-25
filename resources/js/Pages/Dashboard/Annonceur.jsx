import Navbar from "@/Components/Navbar";
import { Link, router, useForm } from "@inertiajs/react"; // ← tu avais oublié d'importer useForm
import { useState } from "react";
import AnnonceurCard from "@/Components/AnnonceurCard";

export default function Annonceur({ auth, annonces, flash }) {
    const user = auth.user;

    const { delete: destroy } = useForm();

    const [listeAnnonces, setListeAnnonces] = useState(annonces);

    const supprimerAnnonce = (id) => {
        router.get(route("annonceur.destroy", id));
    };

    const onEdit = (id) => {
       router.get(route("annonceur.edit", id));
    };

    const onChangeStatut = (id, statut) => {
        router.get(route("annonceur.changerStatut", { id, statut })) ;
    };

    return (
        <>
            <Navbar auth={auth} />
            <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-6">
                <h1 className="text-3xl font-bold mb-6">Mes annonces</h1>

                {flash?.success && (
                    <div className="mb-4 p-3 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-3 rounded bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
                        {flash.error}
                    </div>
                )}

                {user.is_verified ? (
                    <div>
                        <Link href={route("annonceur.create")} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                             Créer une annonce
                        </Link>

                        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listeAnnonces.length === 0 ? (
                                <div className="col-span-full text-center text-red-600 dark:text-red-400 p-4">
                                    Vous n'avez aucune annonce pour le moment.
                                </div>
                            ) : (
                                listeAnnonces.map((a) => (
                                    <div key={a.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4" >
                                        <AnnonceurCard annonce={a} onEdit={onEdit} onChangeStatut={onChangeStatut} onDeleteLocal={supprimerAnnonce}/>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded">
                        <p>
                            Votre compte annonceur n'est pas encore vérifié.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}