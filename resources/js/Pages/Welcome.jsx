import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar'; 
import InfoCard from '@/Components/InfoCard';

export default function Welcome({ auth, annonceursCount, annoncesCount, citoyensCount }) {
    return (
        <>
            <Head title="Accueil" />
            <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
                <Navbar auth={auth} />
                <br />
                <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl font-extrabold mb-4">
                        Bienvenue sur <span className="text-blue-600">SNA</span>
                    </h1>
                    <p className="text-lg max-w-2xl mb-8">
                        C'est la plateforme  où vous pouvez partager, découvrir et échanger facilement.
                        Publiez vos annonces, et trouvez ce dont vous avez besoin.
                    </p>
                    <div className="space-x-4 mb-12">
                        <Link
                            href={route('propos')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            découvrir plus 
                        </Link>
                        <Link
                            href={route('register')}
                            className="px-6 py-3 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition"
                        >
                            S'inscrire
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mt-12">
                        <div className="h-80 flex justify-center">
                            <img 
                                src="/images/principale.png" 
                                className="w-4/5 h-full object-cover rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="flex flex-col justify-between h-80">
                            <InfoCard description="Annonceurs" res={annonceursCount} />
                            <InfoCard description="Annonces publiées" res={annoncesCount} />
                            <InfoCard description="Communautés actives" res={citoyensCount} />
                        </div>
                    </div>
                    <p className="text-lg max-w-7xl mt-8 text-center">
                        Pour avoir une vue d'ensemble sur nos activités et découvrir les moments forts de notre communauté, 
                        vous pouvez consulter notre <Link href="" className="text-blue-600 hover:underline">galerie</Link>.
                    </p>
                </section>
                <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                    © 2026 SNA  Tous droits réservés
                </footer>
            </div>
        </>
    );
}