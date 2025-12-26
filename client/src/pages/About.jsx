import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 space-y-24 pb-24 pt-10 relative isolate">
      
      {/* 1. Header Section - Refined Proportions */}
      <section className="text-center">
        <div className="mb-6">
          <span className="rounded-full bg-pink-500/10 dark:bg-pink-500/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400 border border-pink-500/20 backdrop-blur-md">
            Our Origin Story
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-[1.1]">
          The Heart Behind <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 italic">Love Unfolds</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium">
          We believe every person carries a universe of emotions. Love Unfolds was built as a digital sanctuary to give those whispers a home.
        </p>
      </section>

      {/* 2. Mission Section - Nature Image & Glass Mosaic */}
      <section className="bg-white/30 dark:bg-white/5 backdrop-blur-3xl border border-white/70 dark:border-white/10 rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Left Side: Text Content */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter italic">The Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed font-medium">
              In a world that moves too fast, we provide a slow, digital sanctuary for stories to bloom. Whether it's the thrill of first love or the quiet beauty of a lifelong bond—we preserve those heartbeats in liquid glass.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Inspire', 'Connect', 'Preserve'].map((label, i) => (
                <div key={label} className="flex flex-col items-center gap-2 p-4 bg-white/40 dark:bg-white/10 rounded-3xl border border-white/60 dark:border-white/10">
                  <span className="text-2xl">{['✨', '🤝', '📖'][i]}</span>
                  <span className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-[9px]">{label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side: Nature Mosaic Card */}
          <div className="relative group">
             {/* Decorative Background Image */}
             <div className="relative h-[400px] w-full bg-gray-200 dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Mountain Sanctuary" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/40 to-transparent mix-blend-overlay"></div>
                
                {/* Floating Glass Quote Overlay */}
                <div className="absolute inset-x-6 bottom-6 bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/50 dark:border-white/10 p-8 rounded-[2rem] shadow-xl">
                   <p className="text-xl italic text-gray-900 dark:text-white font-bold leading-tight">
                     "Every story is a heartbeat waiting to be heard."
                   </p>
                   <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-pink-600 dark:text-pink-400">The Sanctuary Team</p>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 3. Call to Action - Scaled Down Elegance */}
      <section className="text-center py-16 bg-white/20 dark:bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/50 dark:border-white/10 shadow-xl max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-4 text-gray-900 dark:text-white tracking-tighter">Your story is ready to unfold.</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 font-medium text-sm max-w-md mx-auto">
          Join a community built on connection, reflection, and the celebration of what makes us human.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-6">
          <Link to="/register" className="bg-pink-600 text-white px-8 py-3.5 rounded-full font-black text-sm shadow-xl shadow-pink-200 dark:shadow-none hover:bg-pink-500 transition-all active:scale-95">
            Join Sanctuary
          </Link>
          <Link to="/stories" className="bg-transparent border border-pink-600 text-pink-600 dark:text-pink-400 px-8 py-3.5 rounded-full font-black text-sm hover:bg-pink-50 transition-all">
            Browse Whispers
          </Link>
        </div>
      </section>
    </div>
  );
}
