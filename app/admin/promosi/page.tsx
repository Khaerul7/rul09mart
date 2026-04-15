"use client";
import { BadgePercent, Copy } from "lucide-react";

const promos = [
  { code: "SEGAR20", desc: "Diskon 20% semua sayuran hijau", expires: "20 Jul 2025", used: 134, active: true },
  { code: "GRATIS10", desc: "Gratis ongkir min. belanja Rp 50.000", expires: "31 Jul 2025", used: 89, active: true },
  { code: "WELCOME15", desc: "Diskon 15% pelanggan baru", expires: "31 Des 2025", used: 42, active: false },
];

export default function PromosiPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-[14px] font-bold text-[#0f2744]">Promosi</h1>
          <p className="text-[11px] text-gray-400">{promos.length} kode promo aktif</p>
        </div>
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0f2744] text-[11px] text-white font-medium hover:bg-[#1a3a5c] transition-colors">
          <BadgePercent size={13} strokeWidth={1.8}/> Buat Promo
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-3">
          {promos.map((p) => (
            <div key={p.code} className="bg-white rounded-xl border border-gray-100 p-5 shadow-card flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <BadgePercent size={22} strokeWidth={1.5} className="text-amber-500"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[14px] font-bold text-[#0f2744] tracking-wider">{p.code}</span>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Copy size={12} strokeWidth={1.8}/>
                  </button>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${p.active ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
                    {p.active ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
                <p className="text-[12px] text-gray-500 mb-1">{p.desc}</p>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span>Berakhir: {p.expires}</span>
                  <span>•</span>
                  <span>Digunakan: {p.used}x</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
