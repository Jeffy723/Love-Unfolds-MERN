import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Stories from "./pages/Stories";
import About from "./pages/About";
import CreateStory from "./pages/CreateStory";
import Profile from "./pages/Profile";
import StoryDetail from "./pages/StoryDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPrivacy from "./pages/UserPrivacy";
import UserTerms from "./pages/UserTerms";


export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fffafa] dark:bg-[#050505] transition-colors duration-700 ease-in-out relative">
      
      {/* GLOBAL LIQUID BACKGROUND BLOBS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-pink-400/30 dark:bg-pink-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[700px] h-[700px] bg-purple-400/30 dark:bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-rose-300/20 dark:bg-rose-800/10 rounded-full blur-[100px] animate-bounce duration-[10s]"></div>
      </div>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-grow pt-32 pb-10 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/story/:id" element={<StoryDetail />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/stories" element={<Stories />} />
            <Route path="/create-story" element={<CreateStory />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

	<Route path="/privacy" element={<UserPrivacy />} />
	<Route path="/terms" element={<UserTerms />} />
          <Route path="*" element={<div className="text-center mt-20 dark:text-white font-bold">404 - This story hasn't unfolded yet.</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
