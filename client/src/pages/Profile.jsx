import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [myStories, setMyStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    if (!token) {
      console.error("No token found. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      const headers = { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      // Correctly using the live environment variable for fetching data
      const [userRes, storiesRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, { headers }),
        fetch(`${import.meta.env.VITE_API_URL}/api/stories/mine`, { headers })
      ]);

      if (!userRes.ok || !storiesRes.ok) {
        console.error(`Fetch failed. Auth: ${userRes.status}, Stories: ${storiesRes.status}`);
        return;
      }

      const userData = await userRes.json();
      const storiesData = await storiesRes.json();

      setUser(userData);
      setMyStories(storiesData.stories || []);
      
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // --- UPDATED DELETE FUNCTION ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this whisper? 🌸")) return;

    try {
      // FIX: Changed from localhost to the dynamic VITE_API_URL variable
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stories/${id}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (res.ok) {
        // UI Update: Remove the story from the list immediately
        setMyStories(prev => prev.filter((story) => story._id !== id));
      } else {
        const errorData = await res.json();
        alert(`Delete failed: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Sanctuary connection lost. Please try again later.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffafa] dark:bg-[#050505]">
        <div className="animate-pulse text-pink-600 text-xl font-black uppercase tracking-[0.2em] italic">
          Unfolding Sanctuary...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20 pt-10 relative z-10">
      
      {/* 1. Profile Header */}
      <div className="bg-white/30 dark:bg-white/5 backdrop-blur-[40px] border border-white/60 dark:border-white/10 rounded-[3rem] p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
        
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

        <div className="w-28 h-28 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-xl transition-transform hover:scale-105 duration-500">
          {user?.name?.charAt(0).toUpperCase() || "?"}
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-1.5 leading-none">
            {user?.name || "Storyteller"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-base tracking-tight mb-6">{user?.email}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
             <div className="px-4 py-1.5 bg-pink-600/10 text-pink-600 dark:text-pink-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-pink-600/10">
               🖋️ {myStories.length} Whispers
             </div>
             <div className="px-4 py-1.5 bg-purple-600/10 text-purple-600 dark:text-purple-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-purple-600/10">
               Est. {new Date().getFullYear()}
             </div>
          </div>
        </div>

        <Link 
          to="/create-story" 
          className="bg-pink-600 text-white px-8 py-3.5 rounded-full font-black text-sm shadow-xl hover:bg-pink-500 transition-all active:scale-95"
        >
          New Story
        </Link>
      </div>

      {/* 2. Collection Header */}
      <div className="flex justify-between items-end mb-10 px-4">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter italic leading-none">
          My <span className="text-pink-600">Collection</span>
        </h2>
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Current Sanctuary Count: {myStories.length}
        </span>
      </div>

      {/* 3. Story Grid */}
      {myStories.length === 0 ? (
        <div className="bg-white/20 dark:bg-white/5 backdrop-blur-xl border-2 border-dashed border-white/40 dark:border-white/10 rounded-[3rem] p-16 text-center">
          <div className="text-5xl mb-4 opacity-30">📖</div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">Your pen is resting.</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Share your first whisper to begin your collection.</p>
          <Link to="/create-story" className="text-pink-600 font-black hover:underline text-sm uppercase tracking-widest">
            Start Writing →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myStories.map((story) => (
            <div key={story._id} className="group relative bg-white/30 dark:bg-white/5 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[2rem] p-7 shadow-xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

              <div className="flex justify-between items-start mb-6">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-pink-500 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/10">
                  Refined Whisper
                </span>
                
                <button 
                  onClick={() => handleDelete(story._id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-all"
                  title="Delete Whisper"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2.5 group-hover:text-pink-600 transition-colors line-clamp-2 leading-tight">
                {story.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 line-clamp-4 text-xs leading-relaxed mb-8 italic font-medium">
                "{story.content}"
              </p>

              <div className="flex items-center justify-between border-t border-gray-100/10 pt-5">
                <Link to={`/story/${story._id}`} className="text-pink-600 font-black text-[10px] uppercase tracking-widest hover:underline">
                  View full →
                </Link>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  {new Date(story.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
