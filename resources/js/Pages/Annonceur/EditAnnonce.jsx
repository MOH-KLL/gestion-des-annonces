import Navbar from "@/Components/Navbar";
import { useForm } from "@inertiajs/react";

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
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6 flex justify-center">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">Modifier l'annonce</h1>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label> Titre </label>
                        <input type="text" value={data.titre}
                            onChange={(e) => setData("titre", e.target.value)}
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-white"/>
                        {errors.titre && <p className="text-red-600 text-sm">{errors.titre}</p>}
                    </div>

                    <div>
                        <label> Description </label>
                        <textarea value={data.description} onChange={(e) => setData("description", e.target.value)}
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-white" rows="5"/>
                        {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
                    </div>

                    <div>
                        <label> Quartier </label>
                        <input type="text" value={data.quartier}
                            onChange={(e) => setData("quartier", e.target.value)}
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-white" />
                    </div>

                    <div>
                        <label> Date de l'action </label>
                        <input type="datetime-local" value={data.date_action} onChange={(e) => setData("date_action", e.target.value)}
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-white" />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label> Min participants </label>
                            <input type="number" min="1" value={data.min_participants} onChange={(e) => setData("min_participants", e.target.value)}
                                className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div className="flex-1">
                            <label> Max participants </label>
                            <input type="number" min="1" value={data.max_participants}
                                onChange={(e) => setData("max_participants", e.target.value)}
                                className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-white" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                            {processing ? "Modification en cours..." : "Modifier"}
                        </button>
                        <a href={route("dashboard")} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                            Annuler
                        </a>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}