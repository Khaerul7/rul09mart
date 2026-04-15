"use client";

const fields = [
  { label: "Nama Toko",      defaultValue: "Rul09Mart",          type: "text" },
  { label: "Nomor WhatsApp", defaultValue: "6281234567890",       type: "text" },
  { label: "Alamat",         defaultValue: "Jakarta Selatan",     type: "text" },
  { label: "Email Admin",    defaultValue: "admin@rul09.id",      type: "email" },
];

export default function PengaturanPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-100 px-6 h-14 flex items-center flex-shrink-0">
        <div>
          <h1 className="text-[14px] font-bold text-[#0f2744]">Pengaturan</h1>
          <p className="text-[11px] text-gray-400">Konfigurasi toko</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-card max-w-lg space-y-4">
          <h2 className="text-[13px] font-semibold text-[#0f2744] mb-2">Informasi Toko</h2>
          {fields.map((f) => (
            <div key={f.label}>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">{f.label}</label>
              <input
                type={f.type}
                defaultValue={f.defaultValue}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 transition-all"
              />
            </div>
          ))}
          <button className="w-full bg-[#0f2744] text-white text-[12px] font-semibold py-2.5 rounded-xl hover:bg-[#1a3a5c] transition-colors mt-2">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
