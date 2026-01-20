export default function Loading() {
    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center p-4">
            <div className="relative">
                {/* Spinner Ring */}
                <div className="w-16 h-16 border-4 border-stone-200 dark:border-stone-800 border-t-amber-500 rounded-full animate-spin"></div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-stone-100 dark:bg-stone-900 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-4 h-4 bg-amber-500/50 rounded-full"></div>
                    </div>
                </div>
            </div>

            <p className="mt-6 text-sm font-medium text-stone-500 dark:text-stone-400 animate-pulse tracking-widest uppercase">
                Horneando...
            </p>
        </div>
    );
}
