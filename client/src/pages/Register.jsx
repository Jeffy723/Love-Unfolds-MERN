import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setMessage("❌ Passwords do not match");
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage("🎉 Account created successfully!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      setMessage("⚠️ Email already exists or server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-6 relative isolate">
      {/* Refined Glass Capsule */}
      <div className="w-full max-w-sm bg-white/30 dark:bg-white/5 backdrop-blur-[40px] border border-white/60 dark:border-white/10 shadow-2xl rounded-[2.5rem] p-8 md:p-10 relative z-10 overflow-hidden">
        
        {/* Specular Edge Highlight */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
            Join <span className="text-pink-600 italic">Us</span> 💖
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm font-medium tracking-tight">
            Start your story today.
          </p>
        </div>

        {message && (
          <p className={`text-center text-xs font-bold mb-5 p-3 rounded-2xl backdrop-blur-md border ${
            message.includes("🎉") 
              ? "bg-green-500/10 border-green-500/20 text-green-600" 
              : "bg-red-500/10 border-red-500/20 text-red-600"
          }`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
            className="w-full px-5 py-3 bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-pink-500/10 text-gray-900 dark:text-white text-sm font-medium shadow-sm transition-all"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            className="w-full px-5 py-3 bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-pink-500/10 text-gray-900 dark:text-white text-sm font-medium shadow-sm transition-all"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="w-full px-5 py-3 bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-pink-500/10 text-gray-900 dark:text-white text-sm font-medium shadow-sm transition-all"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            className="w-full px-5 py-3 bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-pink-500/10 text-gray-900 dark:text-white text-sm font-medium shadow-sm transition-all"
            required
          />

          <button className="w-full bg-pink-600 text-white py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-pink-200 dark:shadow-none hover:bg-pink-500 hover:-translate-y-0.5 transition-all active:scale-[0.98] mt-3">
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-xs font-bold tracking-wide uppercase">
            Already a member?
            <Link to="/login" className="text-pink-600 ml-2 hover:underline transition-all">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
