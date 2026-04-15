"use client";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store";
import { formatRupiah } from "../data";

type Props = { open: boolean; onClose: () => void };

export default function CartDrawer({ open, onClose }: Props) {
  const { items, increment, decrement, remove, total, clear } = useCartStore();

  function handleWhatsApp() {
    const lines = items.map((i) => `- ${i.product.name} x${i.qty} = ${formatRupiah(i.product.price * i.qty)}`);
    const msg = `Halo Rul09Mart! Saya ingin memesan:\n${lines.join("\n")}\n\nTotal: ${formatRupiah(total())}\n\nMohon konfirmasinya, terima kasih 🥬`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, "_blank");
    clear();
    onClose();
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm" onClick={onClose}/>

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-[15px] font-bold text-gray-900">Keranjang Belanja</h2>
            <p className="text-[11px] text-gray-400">{items.length} jenis produk</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X size={18} strokeWidth={2}/>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <ShoppingBag size={40} strokeWidth={1.2}/>
              <p className="text-[13px]">Keranjang masih kosong</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                  {item.product.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-800 truncate">{item.product.name}</p>
                  <p className="text-[11px] text-emerald-600 font-bold">{formatRupiah(item.product.price)}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => decrement(item.product.id)} className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:border-amber-400 transition-colors">
                    <Minus size={11} strokeWidth={2.5}/>
                  </button>
                  <span className="text-[12px] font-bold text-gray-800 w-5 text-center">{item.qty}</span>
                  <button onClick={() => increment(item.product.id)} className="w-6 h-6 rounded-md bg-amber-400 flex items-center justify-center hover:bg-amber-500 transition-colors">
                    <Plus size={11} strokeWidth={2.5} className="text-amber-900"/>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-gray-500">Total Belanja</span>
              <span className="text-[16px] font-extrabold text-emerald-600">{formatRupiah(total())}</span>
            </div>
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25d366] text-white font-bold text-[13px] py-3 rounded-xl flex items-center justify-center gap-2.5 hover:bg-[#20ba58] active:scale-[0.98] transition-all"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pesan via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
