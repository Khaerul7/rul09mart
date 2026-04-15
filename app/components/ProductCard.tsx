"use client";
import { Product, formatRupiah } from "../data";
import { useCartStore } from "../store";
import { Plus, Check } from "lucide-react";
import { useState } from "react";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const add = useCartStore((s) => s.add);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  }

  return (
    <div className="bg-white border-[1.5px] border-gray-200 hover:border-amber-400 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group shadow-card hover:shadow-card-hover">
      {/* Image area */}
      <div className="h-20 bg-emerald-50 overflow-hidden justify-center text-4xl group-hover:bg-emerald-100 transition-colors duration-200">
       <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"/>
      </div>

      {/* Info */}
      <div className="p-2.5">
        {product.discount && (
          <span className="inline-block bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded mb-1">
            -{product.discount}%
          </span>
        )}
        <p className="text-[11px] font-semibold text-gray-800 leading-tight mb-0.5">{product.name}</p>
        <p className="text-[10px] text-gray-400 mb-1.5">per {product.unit}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold text-emerald-600">{formatRupiah(product.price)}</p>
            {product.originalPrice && (
              <p className="text-[9px] text-gray-300 line-through">{formatRupiah(product.originalPrice)}</p>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={product.status === "empty"}
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-amber-900 font-bold text-lg transition-all duration-150 active:scale-90 ${
              added
                ? "bg-emerald-500 text-white"
                : product.status === "empty"
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-amber-400 hover:bg-amber-500"
            }`}
          >
            {added ? <Check size={14} strokeWidth={2.5}/> : <Plus size={16} strokeWidth={2.5}/>}
          </button>
        </div>
      </div>
    </div>
  );
}
