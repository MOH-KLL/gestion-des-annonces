import { useForm, Link, Head } from '@inertiajs/react';
import InscriptionCard from '@/Components/InscriptionCard';
import Navbar from '@/Components/Navbar';

export default function MesInscriptions({ auth, inscriptions }) {
    const { delete: destroy } = useForm();

    const annuler = (inscriptionId) => {
        destroy(route('inscription.destroy', inscriptionId));
    };

    return (
        <>
            <Head title="Mes inscriptions"/>
            <Navbar auth={auth} />
            
            <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <main className="relative z-10 pt-24 pb-12 px-4 max-w-6xl mx-auto">
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
                        Mes inscriptions
                    </h1>

                    {inscriptions.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl p-8 text-center max-w-md mx-auto">
                            <p className="text-lg text-gray-600 dark:text-slate-400 mb-6">
                                Vous n'avez aucune inscription en cours.
                            </p>
                            <Link 
                                href={route('dashboard')} 
                                className="inline-block px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 shadow-lg hover:shadow-xl transition-all"
                            >
                                S'inscrire à des annonces
                            </Link>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {inscriptions.map((i) => (
                                <div key={i.id} className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
                                    <InscriptionCard inscription={i} annuler={annuler} />
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}