"use client";
import { CATEGORIES, PRODUCTS } from "../../data";
import { Pencil } from "lucide-react";

export default function KategoriPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-100 px-6 h-14 flex items-center flex-shrink-0">
        <div>
          <h1 className="text-[14px] font-bold text-[#0f2744]">Kategori</h1>
          <p className="text-[11px] text-gray-400">{CATEGORIES.filter((c) => c.id !== "all").length} kategori</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
            const count = PRODUCTS.filter((p) => p.category === cat.id).length;
            return (
              <div key={cat.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-card flex items-center gap-3 group hover:border-emerald-200 transition-colors">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[22px] flex-shrink-0">{cat.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-800">{cat.label}</p>
                  <p className="text-[10px] text-gray-400">{count} produk</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-blue-50">
                  <Pencil size={12} strokeWidth={1.8} className="text-blue-500"/>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
