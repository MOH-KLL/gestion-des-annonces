import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ValueCard from '@/Components/ValueCard';

export default function Propos({ auth }) {
    return (
        <>
            <Head title="A propos" />
            
            {/* Même style que Welcome :Fond adaptatif + Glows */}
            <div className="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white selection:bg-blue-500 selection:text-white overflow-hidden relative font-sans transition-colors duration-300">
                
                {/* Glow Effects */}
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <Navbar auth={auth} />

                {/* MAIN CONTENT */}
                <main className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    
                    <section className="max-w-3xl mx-auto text-center mb-20">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-blue-600 dark:text-blue-300 text-xs font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Notre Mission
                        </div>

                        {/* Titre moderne avec dégradé */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                            À propos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-500">SNA</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 leading-relaxed">
                            <span className="font-semibold text-gray-900 dark:text-slate-200">SNA</span> (Social Network Annonces) est une plateforme dédiée aux annonces sociales 
                            qui visent à faire du bien. Notre mission est de créer un espace où chacun peut 
                            partager, aider et trouver des opportunités solidaires, tout en ayant la possibilité 
                            de développer sa société.
                        </p>
                    </section>

                   <div className="flex flex-col md:flex-row gap-6">
                        <div className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <ValueCard icone={"❤️"} titre={"Solidarité"} description={"Favoriser l'entraide et le partage."} />
                        </div>
                        <div className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <ValueCard icone={"🤝"} titre={"Communauté"} description={"Créer des liens entre les personnes."} />
                        </div>
                        <div className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <ValueCard icone={"🌍"} titre={"Impact positif"} description={"Encourager des actions utiles et bienveillantes."} />
                        </div>
                    </div>
                </main>
                <footer className="border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-slate-950 py-12 text-center">
                    <p className="text-gray-500 dark:text-slate-500 text-sm">
                        © 2026 SNA - Tous droits réservés
                    </p>
                </footer>
            </div>
        </>
    );
}