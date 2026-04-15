"use client";
import { useState } from "react";
import { PRODUCTS, Product, formatRupiah } from "../../data";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import clsx from "clsx";

const statusMap = {
  available: { label: "Tersedia",     cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  low:       { label: "Stok Menipis", cls: "bg-amber-50 text-amber-700",     dot: "bg-amber-500" },
  empty:     { label: "Habis",        cls: "bg-red-50 text-red-700",         dot: "bg-red-500" },
};

export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(id: string) {
    if (confirm("Hapus produk ini?")) setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleEdit(p: Product) {
    setEditTarget(p);
    setShowModal(true);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-[14px] font-bold text-[#0f2744]">Produk</h1>
          <p className="text-[11px] text-gray-400">{products.length} produk terdaftar</p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setShowModal(true); }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0f2744] text-[11px] text-white font-medium hover:bg-[#1a3a5c] transition-colors"
        >
          <Plus size={13} strokeWidth={2}/> Tambah Produk
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 h-10 max-w-xs shadow-card">
          <Search size={14} strokeWidth={1.8} className="text-gray-400"/>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="bg-transparent text-[12.5px] outline-none text-gray-700 placeholder:text-gray-400 w-full"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-card">
          <table className="w-full" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr className="bg-gray-50">
                {["Produk","Kategori","Harga","Stok","Status","Aksi"].map((h) => (
                  <th key={h} className="text-left text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-5 py-2.5 border-b border-gray-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const s = statusMap[p.status];
                return (
                  <tr key={p.id} className={clsx("border-b border-gray-50 hover:bg-gray-50/60 transition-colors", i === filtered.length - 1 && "border-b-0")}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-[16px] flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <span className="text-[12px] font-medium text-gray-800 truncate">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-[12px] text-gray-500 capitalize">{p.category}</td>
                    <td className="px-5 py-3 text-[12px] font-bold text-emerald-600">{formatRupiah(p.price)}</td>
                    <td className="px-5 py-3 text-[12px] text-gray-600">{p.stock > 0 ? `${p.stock} kg` : "—"}</td>
                    <td className="px-5 py-3">
                      <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold", s.cls)}>
                        <span className={clsx("w-1.5 h-1.5 rounded-full flex-shrink-0", s.dot)}/>{s.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => handleEdit(p)} className="w-7 h-7 rounded-md border border-gray-200 bg-white flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-colors">
                          <Pencil size={12} strokeWidth={1.8} className="text-blue-500"/>
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="w-7 h-7 rounded-md border border-gray-200 bg-white flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-[15px] font-bold text-[#0f2744] mb-4">{editTarget ? "Edit Produk" : "Tambah Produk"}</h2>
            <div className="space-y-3">
              {[["Nama Produk", "text", editTarget?.name ?? ""], ["Harga (Rp)", "number", editTarget?.price ?? ""], ["Stok (kg)", "number", editTarget?.stock ?? ""]].map(([label, type, val]) => (
                <div key={label as string}>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">{label as string}</label>
                  <input type={type as string} defaultValue={val as string} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-emerald-500 transition-colors"/>
                </div>
              ))}
              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">Status</label>
                <select defaultValue={editTarget?.status ?? "available"} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-emerald-500 transition-colors">
                  <option value="available">Tersedia</option>
                  <option value="low">Stok Menipis</option>
                  <option value="empty">Habis</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-[12px] text-gray-600 font-medium hover:bg-gray-50 transition-colors">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl bg-[#0f2744] text-[12px] text-white font-medium hover:bg-[#1a3a5c] transition-colors">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
