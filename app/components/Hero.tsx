import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-emerald-600 px-5 pt-6 pb-0 flex items-end justify-between overflow-hidden min-h-[156px] relative">
      {/* Left content */}
      <div className="flex-1 pb-20 z-10 pr-2">
        {/* Promo pill */}
        <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/30 rounded-full px-5 py-1 text-[10px] text-white mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"/>
          Promo Minggu Ini
        </div>

        {/* Headline */}
        <h1 className="text-[30px] font-extrabold text-white leading-snug uppercase tracking-tight mb-3">
          DISKON 20% UNTUK SEMUA<br/>
          <span className="text-amber-200">SAYURAN HIJAU!</span>
        </h1>

        {/* Promo code */}
        <div className="inline-flex items-center gap-2.5 bg-black/20 rounded-lg px-3 py-2 mb-4">
          <span className="text-[11px] text-white/80">Kode Promo:</span>
          <span className="text-[16px] font-extrabold text-amber-200 tracking-[2px]">SEGAR20</span>
        </div>

        {/* CTA */}
        <div>
          <button className="bg-amber-400 text-amber-900 font-bold text-[12px] px-4 py-2.5 rounded-lg hover:bg-amber-500 active:scale-95 transition-all duration-150">
            Belanja Sekarang
          </button>
        </div>
      </div>

      {/* SVG Vegetable Illustration */}
      <Image 
        src="/products/macamSayuran.png" 
        alt="Bayam" 
        width={500} 
        height={500} 
      />
    </section>
  );
}
