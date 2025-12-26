import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
     const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
      localStorage.setItem("token", res.data.token);
      setStatus({ type: "success", message: "🎉 Welcome back! Redirecting..." });
      window.dispatchEvent(new Event("storage"));
      setTimeout(() => navigate("/stories"), 1500);
    } catch (err) {
      setLoading(false);
      setStatus({ 
        type: "error", 
        message: err.response?.data?.message || "❌ Invalid email or password" 
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-6 relative isolate">
      {/* Liquid Glass Capsule */}
      <div className="bg-white/30 dark:bg-white/5 backdrop-blur-[40px] border border-white/60 dark:border-white/10 shadow-2xl rounded-[2.5rem] p-8 md:p-12 max-w-sm w-full relative z-10 overflow-hidden">
        
        {/* Specular Edge Highlight */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
            Welcome <span className="text-pink-600 italic">Back</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm font-medium tracking-tight">
            Your sanctuary of stories is waiting.
          </p>
        </div>

        {status.message && (
          <div className={`mb-6 p-3.5 rounded-2xl text-xs text-center font-bold backdrop-blur-md border ${
            status.type === "success" 
              ? "bg-green-500/10 border-green-500/20 text-green-600" 
              : "bg-red-500/10 border-red-500/20 text-red-600"
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-pink-500/10 outline-none transition-all text-gray-900 dark:text-white text-sm font-medium shadow-sm"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-pink-500/10 outline-none transition-all text-gray-900 dark:text-white text-sm font-medium shadow-sm"
              required
            />
          </div>

          <button 
            disabled={loading}
            className={`w-full py-3.5 rounded-2xl font-black text-sm text-white shadow-xl shadow-pink-200 dark:shadow-none transition-all flex justify-center items-center active:scale-[0.98] mt-2 ${
              loading ? "bg-pink-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-500 hover:-translate-y-0.5"
            }`}
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-xs font-bold tracking-wide uppercase">
            New here? 
            <Link to="/register" className="text-pink-600 ml-2 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
