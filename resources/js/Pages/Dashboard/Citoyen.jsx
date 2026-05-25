import { Head, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import AnnonceCards from '@/Components/AnnonceCards';

export default function Citoyen({ auth, annonces, inscriptions , score }) {
    const { post, delete: destroy } = useForm();

    const inscrire = (annonceId) => {
        post(route('inscription.store', annonceId));
    };

    const annulerToutes = () => {
        if (confirm("Voulez-vous annuler toutes vos inscriptions en attente ?")) {
            destroy(route('inscription.annulerToutes'));
        }
    };

    return (
        
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Head  title='Citoyen'/>
            <Navbar auth={auth} />

            <div className="p-8 max-w-6xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-6">
                    Bonjour, {auth.user.name} 👋
                </h1>
                <div className="flex gap-3 justify-center">
                    <a href={route('citoyen.inscriptions')}  className="px-3 py-1 bg-green-600 text-white rounded">
                        Mes inscriptions </a>
                    <button onClick={annulerToutes}  disabled={inscriptions.length === 0}
                        className={`px-3 py-1 rounded text-white ${inscriptions.length === 0 ? "bg-gray-400" : "bg-red-600"}`}>
                        Annuler toutes mes inscriptions </button>
                         <span className="px-3 py-1 bg-gray-700 text-white rounded">
                    Mon Score civique  : {score}  ⭐
                </span>
                </div>
                 <br />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {annonces.map((a) => (
                        <AnnonceCards key={a.id} annonce={a} inscrire={inscrire} dejaInscrit={inscriptions.some(i => i.annonce_id === a.id)}/>
                    ))}
                </div>
            </div>
            
        </div>
    );
}