import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

            <div className="relative z-10 max-w-lg text-center space-y-8">

                {/* 404 Visualization */}
                <div className="relative h-64 w-full mb-8">
                    <Image
                        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop"
                        alt="404 Cake"
                        fill
                        className="object-contain opacity-20 dark:opacity-10 grayscale mask-image-gradient"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-9xl font-bold font-serif opacity-10">404</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-stone-50 dark:bg-stone-950 p-4 rounded-full shadow-2xl border-4 border-stone-100 dark:border-stone-900">
                            <Search size={64} className="text-amber-500" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-4xl font-bold font-serif text-stone-800 dark:text-stone-100">
                        Página no encontrada
                    </h2>
                    <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                        Parece que buscabas un postre que ya se terminaron. <br />
                        Esta página no existe o ha sido movida.
                    </p>
                </div>

                <div className="flex justify-center pt-4">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold shadow-lg hover:shadow-amber-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <Home size={20} className="group-hover:scale-110 transition-transform" />
                        <span>Volver al Menú Principal</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
