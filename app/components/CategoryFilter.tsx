"use client";
import { CATEGORIES } from "../data";
import clsx from "clsx";

type Props = {
  active: string;
  onChange: (id: string) => void;
};

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div>
      <h2 className="text-[16px] font-semibold text-gray-800 px-5 mt-4 mb-2.5">Kategori</h2>
      <div className="flex gap-2.5 px-5 pb-1 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="flex flex-col items-center gap-1.5 min-w-[56px] flex-shrink-0 group"
          >
            <div
              className={clsx(
                "w-12 h-12 rounded-2xl flex items-center justify-center text-[22px] border-2 transition-all duration-200",
                active === cat.id
                  ? "border-emerald-600 bg-emerald-100"
                  : "border-transparent bg-emerald-50 group-hover:border-emerald-400 group-hover:bg-emerald-100"
              )}
            >
              {cat.emoji}
            </div>
            <span className="text-[10px] text-gray-500 text-center leading-tight">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
