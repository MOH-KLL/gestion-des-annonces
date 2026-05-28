import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar'; 
import InfoCard from '@/Components/InfoCard';

export default function Welcome({ auth, annonceursCount, annoncesCount, citoyensCount }) {
    return (
        <>
            <Head title="Accueil" />

            <div className="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <Navbar auth={auth} />

                <main className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    
                    <div className="text-center max-w-4xl mx-auto mb-24">
                        
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8">
                            <span className="block text-gray-900 dark:text-slate-200">Bienvenue sur</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-500">
                                SNA
                            </span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            C'est la plateforme où vous pouvez partager, découvrir et échanger facilement.
                            Publiez vos annonces, et trouvez ce dont vous avez besoin.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <Link
                                href={route('propos')}
                                className="group relative px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                                Découvrir Plus
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            
                            <Link
                                href={route('register')}
                                className="px-8 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-200 rounded-full font-semibold text-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                                S'inscrire
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        
                        <div className="md:col-span-7 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 dark:opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                            
                            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-slate-900 aspect-video flex items-center justify-center">
                                <img  src="/images/principale.png"  
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" />
                            </div>
                        </div>

                        <div className="md:col-span-5 flex flex-col gap-4">
                                <InfoCard description="Annonceurs"  res={annonceursCount} />
                                <InfoCard  description="Annonces publiées"  res={annoncesCount} />
                                <InfoCard  description="Communautés actives" res={citoyensCount} />
                        </div>
                    </div>
                </main>

                <footer className="border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-slate-950 py-12 text-center">
                    <p className="text-gray-500 dark:text-slate-500 text-sm">
                        © 2026 SNA Tous droits réservés
                    </p>
                </footer>
            </div>
        </>
    );
}