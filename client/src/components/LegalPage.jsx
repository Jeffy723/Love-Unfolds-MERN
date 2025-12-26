import { Link } from "react-router-dom";

export default function LegalPage({ title, lastUpdated, children }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
      <div className="bg-white/30 dark:bg-white/5 backdrop-blur-3xl border border-white/70 dark:border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
        
        {/* Specular Highlight */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

        <header className="mb-12 border-b border-gray-200/20 pb-8">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">
            {title}
          </h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-pink-600 dark:text-pink-400">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <div className="prose prose-pink dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
          {children}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200/20">
          <Link to="/" className="text-pink-600 font-black text-xs uppercase tracking-widest hover:underline">
            ← Return to Sanctuary
          </Link>
        </div>
      </div>
    </div>
  );
}
