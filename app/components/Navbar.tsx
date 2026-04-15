"use client";
import { Heart, Bell, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const count = useCartStore((s) => s.count());
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 h-[62px] flex items-center px-5 gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer select-none">
          {/* Leaf SVG logo */}
          <div className="w-[38px] h-[38px] flex-shrink-0">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="36" height="36" rx="9" fill="#059669"/>
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
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-extrabold text-emerald-600 leading-none tracking-tight">Rul09Mart</span>
            <span className="text-[9px] text-emerald-300 uppercase tracking-widest leading-none">Sayuran Segar</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md flex items-center gap-2 bg-slate-300 rounded-xl px-3.5 h-[38px] border border-slate-400">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="bg-transparent border-none outline-none text-[12.5px] text-slate-800 placeholder:text-slate-500 w-full"
            placeholder="Cari sayuran segar..."
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-1 ml-auto">
          <button className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-500 hover:bg-amber-100 hover:text-amber-700 transition-all duration-150">
            <Heart size={22} strokeWidth={1.7}/>
          </button>
          <button className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-500 hover:bg-amber-100 hover:text-amber-700 transition-all duration-150 relative">
            <Bell size={22} strokeWidth={1.7}/>
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full border-2 border-white"/>
          </button>
          <button
            onClick={() => setCartOpen(true)}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-500 hover:bg-amber-100 hover:text-amber-700 transition-all duration-150 relative"
          >
            <ShoppingBag size={22} strokeWidth={1.7}/>
            {count > 0 && (
              <span className="absolute top-1.5 right-1.5 w-[18px] h-[18px] bg-amber-400 text-amber-900 text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {count}
              </span>
            )}
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1.5"/>
          <div className="w-8 h-8 rounded-full bg-emerald-100 border-[1.5px] border-emerald-300 flex items-center justify-center text-[12px] font-bold text-emerald-700 cursor-pointer hover:border-amber-400 transition-colors">
            AR
          </div>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}/>
    </>
  );
}
