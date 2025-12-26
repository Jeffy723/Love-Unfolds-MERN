import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/stories")
      .then((res) => res.json())
      .then((data) => {
        setStories(data.stories || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-6 max-w-7xl mx-auto min-h-screen pt-10 pb-20 relative isolate">
      {/* 1. Refined Header Section */}
      <header className="text-center mb-20">
        <div className="mb-4">
          <span className="rounded-full bg-pink-500/10 dark:bg-pink-500/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-pink-600 dark:text-pink-400 border border-pink-500/20 backdrop-blur-md">
            Community Memoirs
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-tight">
          Shared <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 italic">Whispers</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm max-w-lg mx-auto">
          Explore the beautiful moments and quiet heartbeats shared by our community.
        </p>
      </header>

      {/* 2. Loading State (Glass Skeleton) */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-white/20 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/40 dark:border-white/10 animate-pulse" />
          ))}
        </div>
      ) : (
        /* 3. Story Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div 
              key={story._id} 
              className="group relative bg-white/30 dark:bg-white/5 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2.5rem] p-8 shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              {/* Sharp Edge Highlight */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              
              <div>
                <div className="flex justify-between items-center mb-6">
                   <span className="text-[9px] font-black uppercase tracking-widest text-pink-500/60">Sanctuary Entry</span>
                   <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">✨</span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-pink-600 transition-colors">
                  {story.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4 leading-relaxed italic font-medium opacity-80">
                  "{story.content}"
                </p>
              </div>

              <div className="mt-10 flex justify-between items-center pt-6 border-t border-gray-100/10 dark:border-white/5">
                <Link 
                  to={`/story/${story._id}`} 
                  className="text-pink-600 font-black text-[10px] uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
                >
                  Read Whisper →
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* 4. Empty State */}
      {!loading && stories.length === 0 && (
        <div className="text-center py-20 bg-white/10 backdrop-blur-md rounded-[3rem] border border-dashed border-white/30">
          <p className="text-gray-500 font-black uppercase tracking-widest text-xs">No whispers found in the sanctuary yet.</p>
        </div>
      )}
    </div>
  );
}
