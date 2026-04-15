"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../authStore";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validasi kosong
    if (!email || !password) {
      setError("Email dan password tidak boleh kosong.");
      return;
    }

    // Simulasi loading sebentar biar terasa natural
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    const success = login(email, password);
    if (success) {
      router.push("/admin");
    } else {
      setError("Email atau password salah. Coba lagi.");
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <Image 
        src="/products/bgLogin.jpg" 
        alt="Bayam" 
        fill // Membuat gambar memenuhi div parent
        priority // Opsional: agar gambar dimuat lebih cepat
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-lg -z-10" />
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 mb-4">
            <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
              <rect width="36" height="36" rx="10" fill="#059669"/>
              <path d="M18 29 C14 24 8 19 9 13 C10 8 15 6 18 10 C21 6 26 8 27 13 C28 19 22 24 18 29Z" fill="white"/>
              <path d="M18 29 L18 10" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M18 20 C15 18 12 16 11 13" stroke="#059669" strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
              <path d="M18 24 C15 22 13 20 12 17" stroke="#059669" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
              <path d="M18 20 C21 18 24 16 25 13" stroke="#059669" strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
              <path d="M18 24 C21 22 23 20 24 17" stroke="#059669" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
              <circle cx="27" cy="27" r="7" fill="#f59e0b"/>
              <text x="27" y="30.5" textAnchor="middle" fontSize="7" fontWeight="800" fill="#78350f" fontFamily="Inter,sans-serif">09</text>
            </svg>
          </div>
          <h1 className="text-[20px] font-extrabold text-[#0f2744] tracking-tight">Rul09Mart</h1>
          <p className="text-[12px] text-gray-400 mt-1">Admin Panel — Masuk untuk melanjutkan</p>
        </div>

        {/* Card form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5">
                <AlertCircle size={14} className="text-red-500 flex-shrink-0"/>
                <p className="text-[12px] text-red-600">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13px] text-gray-800 outline-none placeholder:text-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 pr-10 text-[13px] text-gray-800 outline-none placeholder:text-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} strokeWidth={1.8}/> : <Eye size={15} strokeWidth={1.8}/>}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f2744] hover:bg-[#1a3a5c] text-white font-bold text-[13px] py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Memverifikasi...
                </>
              ) : (
                <>
                  <LogIn size={15} strokeWidth={2}/>
                  Masuk ke Dashboard
                </>
              )}
            </button>
          </form>
        </div>
        <p className="text-center text-[10px] text-gray-300 mt-6">© 2025 Rul09Mart. All rights reserved.</p>
      </div>
    </div>
  );
}
