import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/stories/${id}`)
      .then(res => res.json())
      .then(data => setStory(data.story || data))
      .catch(err => console.log(err));
  }, [id]);

  if (!story) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse text-pink-600 font-black text-2xl uppercase tracking-tighter">Unfolding...</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      {/* Back Button Glass Pill */}
      <Link 
        to="/stories" 
        className="inline-flex items-center gap-2 mb-10 px-6 py-2.5 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 text-gray-700 dark:text-gray-200 font-bold hover:scale-105 transition-all shadow-lg"
      >
        <span>←</span> All Stories
      </Link>

      {/* The Big Glass Pane */}
      <div className="bg-white/30 dark:bg-white/5 backdrop-blur-[60px] border border-white/70 dark:border-white/10 rounded-[3.5rem] p-8 md:p-20 shadow-2xl relative overflow-hidden">
        
        {/* Specular Highlight (The Apple Glass look) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

        <header className="mb-12 border-b border-gray-200/20 dark:border-white/5 pb-10">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-tight">
            {story.title}
          </h1>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
             <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
               Captured on {new Date(story.createdAt).toLocaleDateString()}
             </p>
          </div>
        </header>

        <article className="prose prose-2xl dark:prose-invert">
          <p className="text-xl md:text-2xl leading-relaxed text-gray-800 dark:text-gray-100 font-medium whitespace-pre-wrap">
            {story.content}
          </p>
        </article>

        <footer className="mt-20 flex justify-between items-center opacity-40">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Love Unfolds Memoir</p>
          <span className="text-3xl">✨</span>
        </footer>
      </div>
    </div>
  );
}
