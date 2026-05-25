import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ValueCard from '@/Components/ValueCard';

export default function Propos({ auth }) {
    return (
        <>
            <Head title="A propos" />
            <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
                <Navbar auth={auth} />
                <section className="max-w-4xl mx-auto py-16 px-6 text-center">
                    <h1 className="text-4xl font-bold mb-6">
                         A propos de <span className="text-blue-600">SNA</span>
                    </h1>
                    <p className="text-lg mb-8">
                        SNA (Social Network Annonces) est une plateforme dédiée aux annonces sociales 
                        qui visent à faire du bien. Notre mission est de créer un espace où chacun peut 
                        partager, aider et trouver des opportunités solidaires , et aussi avoir la possibilité 
                        de développer sa société.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <ValueCard  icone={"❤️"} titre={'Solidarité'} description={"Favoriser l'entraide et le partage."} />
                        <ValueCard  icone={"🤝"} titre={'Communauté'} description={"Créer des liens entre les personnes."} />
                        <ValueCard  icone={"🌍"} titre={'Impact positif'} description={"Encourager des actions utiles et bienveillantes."} />
                    </div>
                </section>
                <footer className="py-8 text-center text-sm text-black dark:text-white/70">
                    © 2026 SNA - Tous droits réservés
                </footer>
            </div>
        </>
    );
}