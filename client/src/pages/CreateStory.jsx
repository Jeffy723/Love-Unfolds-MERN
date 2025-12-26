import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateStory() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return setStatus({ type: "error", message: "🔒 Please login to share your story." });
    }

    try {
      const res = await fetch("http://localhost:5000/api/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setStatus({ type: "success", message: "✨ Your whisper has been unfolded." });
        setTimeout(() => navigate("/stories"), 1500);
      } else {
        setLoading(false);
        setStatus({ type: "error", message: data.message || "Something went wrong." });
      }
    } catch (err) {
      setLoading(false);
      setStatus({ type: "error", message: "Server connection failed." });
    }
  };

  return (
    <div className="relative min-h-screen pt-16 pb-20 px-6 overflow-hidden isolate">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* 1. Editor Section - Scaled Down Elegance */}
          <div className="flex-1">
            <div className="mb-6">
              <span className="rounded-full bg-pink-500/10 dark:bg-pink-500/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400 border border-pink-500/20 backdrop-blur-md">
                The Writing Room
              </span>
            </div>

            <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white mb-2 leading-tight">
              Tell Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 italic">Story</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-10 max-w-md">
              Your words might be the exact whisper someone needs to hear today.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {status.message && (
                <div className={`p-4 rounded-2xl text-xs font-bold backdrop-blur-md border ${
                  status.type === "success" 
                  ? "bg-green-500/5 border-green-500/20 text-green-600" 
                  : "bg-red-500/5 border-red-500/20 text-red-600"
                }`}>
                  {status.message}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400 ml-4">Whisper Title</label>
                <input
                  className="w-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl p-4.5 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all text-lg font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700 shadow-xl"
                  placeholder="The moment it all changed..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400 ml-4">Heart of the Story</label>
                <textarea
                  className="w-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-[2rem] p-6 h-64 resize-none focus:ring-4 focus:ring-pink-500/10 outline-none transition-all leading-relaxed text-gray-800 dark:text-gray-200 text-base shadow-xl placeholder:text-gray-300 dark:placeholder:text-gray-700 italic"
                  placeholder="It began with a quiet glance..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <button
                disabled={loading}
                className={`w-full py-4 rounded-full font-black text-sm text-white shadow-xl transition-all duration-300 active:scale-[0.98] ${
                  loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-pink-600 shadow-pink-200 dark:shadow-none hover:bg-pink-500 hover:-translate-y-0.5"
                }`}
              >
                {loading ? "Unfolding Whisper..." : "Publish to Sanctuary"}
              </button>
            </form>
          </div>

          {/* 2. Live Preview - Compact Liquid Glass */}
          <div className="lg:w-80 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 ml-4">Sanctuary Preview</h3>
              
              <div className="group relative bg-white/30 dark:bg-white/5 backdrop-blur-[40px] p-8 rounded-[2.5rem] border border-white/60 dark:border-white/10 shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-400 rounded-xl shadow-lg flex items-center justify-center text-lg">❤️</div>
                  <span className="text-[8px] font-black text-pink-500 uppercase tracking-widest bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/10">Draft</span>
                </div>
                
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                  {title || "Untitled"}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-[13px] leading-relaxed italic line-clamp-[6] opacity-80">
                  "{content || "As you write your heart out, your story will bloom here in real-time..."}"
                </p>

                <div className="mt-8 pt-5 border-t border-gray-100/10 flex justify-between items-center">
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Read Whisper →</span>
                  <div className="flex gap-1.5 opacity-40">
                    <span className="animate-pulse">✨</span>
                    <span className="animate-bounce">💖</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
