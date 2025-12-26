import { Link } from "react-router-dom";

export default function Home() {
  const userLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="relative isolate px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:flex lg:py-32 items-center justify-between">
        
        {/* Left Content Side */}
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl text-center lg:text-left">
          <div className="mb-8">
            <span className="rounded-full bg-pink-500/10 dark:bg-pink-500/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-pink-600 dark:text-pink-400 border border-pink-500/20 backdrop-blur-md">
              ✨ Every Story is a Sanctuary
            </span>
          </div>

          {/* Scaled down typography for better elegance */}
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-6xl lg:text-7xl leading-[1.1]">
            Love Stories <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 italic">Unfold</span> in Glass.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400 font-medium max-w-md mx-auto lg:mx-0">
            A liquid-glass sanctuary designed to celebrate the whispers of the heart and the moments that make us human.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <Link
              to={userLoggedIn ? "/create-story" : "/register"}
              className="w-full sm:w-auto rounded-full bg-pink-600 px-10 py-4 text-base font-black text-white shadow-xl shadow-pink-200 dark:shadow-pink-900/40 hover:-translate-y-1 transition-all active:scale-95"
            >
              Start Writing
            </Link>
            <Link to="/stories" className="text-base font-bold text-gray-900 dark:text-gray-200 hover:text-pink-600 transition-colors group">
              Explore Stories <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Visual Glass Image Stack */}
        <div className="hidden lg:flex relative flex-none justify-center items-center w-[500px] h-[500px]">
          
          {/* Background Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400/30 rounded-full blur-[100px] animate-pulse"></div>

          {/* Main Image Card (The Sanctuary) */}
          <div className="relative z-20 w-80 h-[450px] bg-white/20 dark:bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/60 dark:border-white/10 shadow-2xl overflow-hidden p-2 transform -rotate-3 hover:rotate-0 transition-all duration-700">
             <img 
               src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000" 
               alt="Nature" 
               className="w-full h-full object-cover rounded-[2.5rem] opacity-90"
             />
             {/* Glass Overlay on Image */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
             <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Featured Whisper</p>
                <p className="text-lg font-bold italic leading-tight">"The stars aligned the moment we spoke."</p>
             </div>
          </div>

          {/* Floating Accents */}
          <div className="absolute top-10 right-0 z-30 w-40 h-40 bg-white/30 dark:bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-xl p-4 transform rotate-12 flex flex-col justify-center items-center text-center">
             <span className="text-4xl mb-2 animate-bounce">💖</span>
             <p className="text-[10px] font-black uppercase tracking-tighter dark:text-white">1.2k Hearts</p>
          </div>

          <div className="absolute bottom-10 -left-10 z-10 w-48 h-48 bg-purple-500/20 backdrop-blur-xl rounded-[2.5rem] border border-white/30 transform -rotate-12 overflow-hidden shadow-lg">
             <img 
               src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&q=80&w=1000" 
               alt="Flowers" 
               className="w-full h-full object-cover opacity-60"
             />
          </div>
        </div>
      </div>
    </div>
  );
}
