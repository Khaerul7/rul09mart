"use client";
import { useState } from "react";
import { ORDERS, formatRupiah } from "../../data";
import clsx from "clsx";

const statusMap = {
  pending:    { label: "Menunggu",   cls: "bg-amber-50 text-amber-700",   dot: "bg-amber-400" },
  processing: { label: "Diproses",  cls: "bg-blue-50 text-blue-700",     dot: "bg-blue-400" },
  done:       { label: "Selesai",   cls: "bg-emerald-50 text-emerald-700",dot: "bg-emerald-500" },
};

export default function PesananPage() {
  const [filter, setFilter] = useState<"all"|"pending"|"processing"|"done">("all");
  const filtered = filter === "all" ? ORDERS : ORDERS.filter((o) => o.status === filter);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-[14px] font-bold text-[#0f2744]">Pesanan</h1>
          <p className="text-[11px] text-gray-400">{ORDERS.length} pesanan total</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-card">
          <div className="px-5 py-3.5 flex items-center gap-2 border-b border-gray-50">
            {(["all","pending","processing","done"] as const).map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={clsx("px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all",
                  filter === s ? "bg-[#0f2744] text-white border-[#0f2744]" : "border-gray-200 text-gray-500 hover:border-[#0f2744] hover:text-[#0f2744]"
                )}>
                {s === "all" ? "Semua" : statusMap[s].label}
              </button>
            ))}
          </div>

          <table className="w-full" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr className="bg-gray-50">
                {["ID Pesanan","Pelanggan","Item","Total","Status","Tanggal"].map((h) => (
                  <th key={h} className="text-left text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-5 py-2.5 border-b border-gray-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => {
                const s = statusMap[o.status];
                return (
                  <tr key={o.id} className={clsx("border-b border-gray-50 hover:bg-gray-50/60 transition-colors", i === filtered.length - 1 && "border-b-0")}>
                    <td className="px-5 py-3 text-[12px] font-mono font-medium text-[#0f2744]">{o.id}</td>
                    <td className="px-5 py-3 text-[12px] text-gray-700 font-medium">{o.customer}</td>
                    <td className="px-5 py-3 text-[12px] text-gray-500">{o.items} produk</td>
                    <td className="px-5 py-3 text-[12px] font-bold text-emerald-600">{formatRupiah(o.total)}</td>
                    <td className="px-5 py-3">
                      <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold", s.cls)}>
                        <span className={clsx("w-1.5 h-1.5 rounded-full flex-shrink-0", s.dot)}/>{s.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[12px] text-gray-400">{o.date}</td>
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
