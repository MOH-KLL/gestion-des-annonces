import Navbar from "@/Components/Navbar";
import { useForm } from "@inertiajs/react";

export default function CreateAnnonce({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        titre: "",
        description: "",
        quartier: "",
        date_action: "",
        min_participants: 1,
        max_participants: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("annonceur.store"), data);
    };

    return (
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col">
            <Navbar auth={auth} /> <br />

            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-4 text-center">Créer une annonce</h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label>Titre</label>
                            <input type="text" value={data.titre} 
                            onChange={(e) => setData("titre", e.target.value)} className="w-full border rounded px-3 py-2" />
                            {errors.titre && <p className="text-red-600 text-sm">{errors.titre}</p>}
                        </div>

                        <div>
                            <label>Description</label>
                            <textarea value={data.description}
                             onChange={(e) => setData("description", e.target.value)} className="w-full border rounded px-3 py-2" rows="5" />
                            {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
                        </div>

                        <div>
                            <label>Quartier</label>
                            <input type="text" value={data.quartier}
                             onChange={(e) => setData("quartier", e.target.value)} className="w-full border rounded px-3 py-2" />
                            {errors.quartier && <p className="text-red-600 text-sm">{errors.quartier}</p>}
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Date de l'action</label>
                            <input type="datetime-local" value={data.date_action} 
                            onChange={(e) => setData("date_action", e.target.value)} className="w-full border rounded px-3 py-2" />
                            {errors.date_action && <p className="text-red-600 text-sm">{errors.date_action}</p>}
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label>Participants minimum</label>
                                <input type="number" min="1" value={data.min_participants} className="w-full border rounded px-3 py-2"
                                onChange={(e) => setData("min_participants", e.target.value)} />
                                {errors.min_participants && <p className="text-red-600 text-sm">{errors.min_participants}</p>}
                            </div>

                            <div className="flex-1">
                                <label>Participants maximum</label>
                                <input type="number" min="1" value={data.max_participants} className="w-full border rounded px-3 py-2"
                                    onChange={(e) => setData("max_participants", e.target.value)}/>
                                {errors.max_participants && <p className="text-red-600 text-sm">{errors.max_participants}</p>}
                            </div>
                        </div>

                        <button type="submit" disabled={processing} className="w-full bg-black text-white px-4 py-2 rounded disabled:opacity-50" >
                            {processing ? "Création en cours..." : "Créer"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}