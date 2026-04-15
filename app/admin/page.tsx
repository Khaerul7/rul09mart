"use client";
import { useState } from "react";
import {
  DollarSign, ShoppingBag, AlertTriangle, Users,
  Pencil, Trash2, Plus, FileText,
} from "lucide-react";
import { PRODUCTS, CATEGORIES, formatRupiah } from "../data";
import clsx from "clsx";

const stats = [
  { label: "Total Penjualan", value: "Rp 4,2jt", change: "+12%", up: true,  icon: DollarSign,    color: "bg-emerald-50",  iconColor: "text-emerald-600" },
  { label: "Pesanan Aktif",   value: "27",        change: "+5",   up: true,  icon: ShoppingBag,   color: "bg-blue-50",     iconColor: "text-blue-500" },
  { label: "Stok Menipis",    value: "4",         change: "Kritis",up: false,icon: AlertTriangle, color: "bg-amber-50",    iconColor: "text-amber-500" },
  { label: "Pelanggan Baru",  value: "18",        change: "+18",  up: true,  icon: Users,         color: "bg-violet-50",   iconColor: "text-violet-500" },
];

const statusMap = {
  available: { label: "Tersedia",     cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  low:       { label: "Stok Menipis", cls: "bg-amber-50 text-amber-700",     dot: "bg-amber-500" },
  empty:     { label: "Habis",        cls: "bg-red-50 text-red-700",         dot: "bg-red-500" },
};

export default function AdminPage() {
  const [filter, setFilter] = useState("all");
  const catFilters = [{ id: "all", label: "Semua" }, ...CATEGORIES.filter((c) => c.id !== "all")];

  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col h-full">
      {/* Topbar */}
      <div className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-[14px] font-bold text-[#0f2744]">Overview</h1>
          <p className="text-[11px] text-gray-400">Senin, 14 Juli 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-200 text-[11px] text-gray-600 font-medium hover:bg-gray-50 transition-colors">
            <FileText size={13} strokeWidth={1.8}/> Laporan
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0f2744] text-[11px] text-white font-medium hover:bg-[#1a3a5c] transition-colors">
            <Plus size={13} strokeWidth={2}/> Tambah Produk
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-card">
                <div className="flex items-start justify-between mb-3">
                  <div className={clsx("w-9 h-9 rounded-lg flex items-center justify-center", s.color)}>
                    <Icon size={18} strokeWidth={1.7} className={s.iconColor}/>
                  </div>
                  <span className={clsx("text-[9px] font-semibold px-2 py-0.5 rounded-full", s.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600")}>
                    {s.change}
                  </span>
                </div>
                <p className="text-[22px] font-bold text-[#0f2744] leading-none mb-1">{s.value}</p>
                <p className="text-[11px] text-gray-400">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-card">
          <div className="px-5 py-3.5 flex items-center justify-between border-b border-gray-50">
            <h2 className="text-[13px] font-semibold text-[#0f2744]">Inventori Produk</h2>
            <div className="flex gap-1.5">
              {catFilters.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  className={clsx(
                    "px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-150",
                    filter === c.id
                      ? "bg-[#0f2744] text-white border-[#0f2744]"
                      : "border-gray-200 text-gray-500 hover:border-[#0f2744] hover:text-[#0f2744]"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <table className="w-full" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-5 py-2.5 border-b border-gray-50" style={{ width: "34%" }}>Produk</th>
                <th className="text-left text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-4 py-2.5 border-b border-gray-50" style={{ width: "16%" }}>Kategori</th>
                <th className="text-left text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-4 py-2.5 border-b border-gray-50" style={{ width: "12%" }}>Stok</th>
                <th className="text-left text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-4 py-2.5 border-b border-gray-50" style={{ width: "20%" }}>Status</th>
                <th className="text-left text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-4 py-2.5 border-b border-gray-50" style={{ width: "18%" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const s = statusMap[p.status];
                return (
                  <tr key={p.id} className={clsx("border-b border-gray-50 hover:bg-gray-50/60 transition-colors", i === filtered.length - 1 && "border-b-0")}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-[30px] h-[30px] bg-emerald-50 rounded-lg flex items-center justify-center text-[15px] flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <span className="text-[12px] font-medium text-gray-800 truncate">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-gray-500 capitalize">{p.category}</td>
                    <td className="px-4 py-3 text-[12px] font-medium text-gray-700">{p.stock > 0 ? `${p.stock} kg` : "—"}</td>
                    <td className="px-4 py-3">
                      <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold", s.cls)}>
                        <span className={clsx("w-1.5 h-1.5 rounded-full flex-shrink-0", s.dot)}/>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button className="w-7 h-7 rounded-md border border-gray-200 bg-white flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-colors">
                          <Pencil size={12} strokeWidth={1.8} className="text-blue-500"/>
                        </button>
                        <button className="w-7 h-7 rounded-md border border-gray-200 bg-white flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors">
                          <Trash2 size={12} strokeWidth={1.8} className="text-red-500"/>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
