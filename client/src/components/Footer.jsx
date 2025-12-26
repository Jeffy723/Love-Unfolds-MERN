import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [showGuidelines, setShowGuidelines] = useState(false);

  return (
    <>
      <footer className="relative z-10 bg-white/30 dark:bg-black/20 backdrop-blur-2xl border-t border-white/50 dark:border-white/10 pt-16 pb-8 px-6 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 font-medium">
          
          {/* Brand Identity */}
          <div className="max-w-sm">
            <h2 className="text-2xl font-black bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">
              Love Unfolds ❤️
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              A liquid-glass sanctuary for hearts to speak. We celebrate every breath of human emotion through the power of storytelling.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-16 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-2">Explore</h4>
              <Link to="/" className="text-sm text-gray-500 hover:text-pink-600 transition-colors">Home</Link>
              <Link to="/stories" className="text-sm text-gray-500 hover:text-pink-600 transition-colors">Stories</Link>
              <Link to="/about" className="text-sm text-gray-500 hover:text-pink-600 transition-colors">About</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-2">Help</h4>
              {/* Trigger the Modal instead of a link */}
              <button 
                onClick={() => setShowGuidelines(true)}
                className="text-left text-sm text-gray-500 hover:text-pink-600 transition-colors outline-none"
              >
                Guidelines
              </button>
              <Link to="/about" className="text-sm text-gray-500 hover:text-pink-600 transition-colors">Privacy</Link>
              <Link to="/about" className="text-sm text-gray-500 hover:text-pink-600 transition-colors">Terms</Link>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-20 pt-8 border-t border-gray-200/20 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2025 Love Unfolds • Memoirs of the Heart</p>
          <div className="flex gap-4">
            <span className="text-xl grayscale hover:grayscale-0 transition-all cursor-default">🌸</span>
            <span className="text-xl grayscale hover:grayscale-0 transition-all cursor-default">✨</span>
          </div>
        </div>
      </footer>

      {/* --- LIQUID GLASS GUIDELINES MODAL --- */}
      {showGuidelines && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          {/* Frosted Backdrop Overlay */}
          <div 
            className="absolute inset-0 bg-white/10 dark:bg-black/40 backdrop-blur-md" 
            onClick={() => setShowGuidelines(false)}
          ></div>
          
          {/* The Modal Content */}
          <div className="relative bg-white/60 dark:bg-[#121212]/80 backdrop-blur-[40px] border border-white/80 dark:border-white/10 rounded-[3rem] p-10 md:p-14 max-w-xl w-full shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] transform animate-in slide-in-from-bottom-10 duration-500">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowGuidelines(false)}
              className="absolute top-6 right-8 text-gray-400 hover:text-pink-600 transition-colors text-2xl"
            >
              ✕
            </button>

            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter">
              Community <span className="text-pink-600 italic font-serif">Rules</span>
            </h2>

            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-2xl">🌱</div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Be Kind</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This is a sanctuary. No hate speech, bullying, or judgment is allowed here.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-2xl">🐚</div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Be Authentic</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Share real emotions. Whether it is joy or heartbreak, let it be your truth.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">🔒</div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Respect Privacy</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Never share private info or full names of others without their explicit consent.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowGuidelines(false)}
              className="mt-12 w-full py-4 rounded-full bg-pink-600 text-white font-black hover:bg-pink-500 transition-all shadow-xl shadow-pink-200 dark:shadow-none active:scale-95"
            >
              I agree to the Whispers
            </button>
          </div>
        </div>
      )}
    </>
  );
}
