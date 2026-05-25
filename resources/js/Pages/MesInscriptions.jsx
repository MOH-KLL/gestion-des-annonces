import { useForm } from '@inertiajs/react';
import InscriptionCard from '@/Components/InscriptionCard';
import Navbar from '@/Components/Navbar';

export default function MesInscriptions({ auth, inscriptions }) {
    const { delete: destroy } = useForm();

    const annuler = (inscriptionId) => {
        destroy(route('inscription.destroy', inscriptionId));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar auth={auth} />

            <div className="p-8 max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-8">
                    Mes inscriptions
                </h1>

                {inscriptions.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Vous n'avez aucune inscription en cours.
                        </p>
                        <br />
                        <a href={route('dashboard')} className="inline-block px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition">
                            s'inscrire a des annonces 
                        </a>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {inscriptions.map((i) => (
                            <InscriptionCard
                                key={i.id}
                                inscription={i}
                                annuler={annuler}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}