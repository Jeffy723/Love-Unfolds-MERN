import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    window.dispatchEvent(new Event("storage"));
  };

  const isActive = (path) => location.pathname === path;

  const navItemStyle = (path) => `
    px-5 py-2 rounded-full transition-all duration-300 font-bold text-sm flex items-center gap-1
    ${isActive(path) 
      ? "bg-pink-600 text-white shadow-lg shadow-pink-200" 
      : "text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/10 hover:text-pink-600"}
  `;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(255,182,193,0.2)] rounded-full px-4 md:px-8 py-3 flex items-center justify-between transition-all duration-500">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:scale-125 transition-transform">💖</span>
          <h1 className="text-xl font-black bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent hidden sm:block">
            Love Unfolds
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 md:gap-4">
          <ul className="hidden lg:flex gap-1 items-center list-none">
            <li><Link to="/" className={navItemStyle('/')}>Home</Link></li>
            <li><Link to="/stories" className={navItemStyle('/stories')}>Stories</Link></li>
            <li><Link to="/about" className={navItemStyle('/about')}>About</Link></li>
          </ul>

          <div className="flex items-center gap-3 border-l border-white/40 pl-4 ml-2">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-white/50 dark:bg-white/5 rounded-full shadow-inner hover:scale-110 transition-all text-xl"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {!isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-pink-600">Login</Link>
                <Link to="/register" className="bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg shadow-pink-200 transition-all hover:bg-pink-500">
                  Join
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* ADDED PROFILE LINK HERE */}
                <Link to="/profile" className={navItemStyle('/profile')}>
                   <span className="hidden sm:inline">Profile</span> 👤
                </Link>
                
                <Link to="/create-story" className={navItemStyle('/create-story')}>
                   <span className="hidden sm:inline">Write</span> ✍️
                </Link>

                <button 
                  onClick={handleLogout} 
                  className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest pl-2 transition-colors border-l border-white/20 ml-1"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
