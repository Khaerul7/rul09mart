// ─── Types ───────────────────────────────────────────────────────────────────

export type Category = {
  id: string;
  label: string;
  emoji: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  image:string;
  price: number;
  originalPrice?: number;
  unit: string;
  stock: number;
  status: "available" | "low" | "empty";
  discount?: number;
};

export type Order = {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: "pending" | "processing" | "done";
  date: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  { id: "all",   label: "Semua",        emoji: "🛒" },
  { id: "daun",  label: "Sayuran Daun", emoji: "🥬" },
  { id: "umbi",  label: "Umbi Akar",    emoji: "🥔" },
  { id: "buah",  label: "Buah Sayur",   emoji: "🍅" },
  { id: "kacang",label: "Kacang Polong",emoji: "🫘" },
  { id: "rempah",label: "Rempah Bumbu", emoji: "🌶️" },
  { id: "siap",  label: "Siap Masak",   emoji: "🥗" },
];

export const PRODUCTS: Product[] = [
  { id: "p1",  name: "Bayam Segar",      category: "daun",   image: "/products/bayam.png",     price: 3500,  originalPrice: 4500,  unit: "ikat ~200g", stock: 42, status: "available", discount: 20 },
  { id: "p2",  name: "Brokoli Premium",  category: "daun",   image:"/products/brokoli.jpg",   price: 18000, originalPrice: 22500, unit: "kg",         stock: 31, status: "available", discount: 20 },
  { id: "p3",  name: "Kangkung",         category: "daun",   image:"/products/kangkung.jpg",  price: 2500,  originalPrice: 3200,  unit: "ikat",       stock: 8,  status: "low",       discount: 20 },
  { id: "p4",  name: "Sawi Hijau",       category: "daun",   image:"/products/sawi.jpg" ,     price: 4000,  originalPrice: 5000,  unit: "ikat",       stock: 24, status: "available", discount: 20 },
  { id: "p5",  name: "Wortel Lokal",     category: "umbi",   image:"/products/wortel.jpg",    price: 9000,  unit: "kg",           stock: 0,  status: "empty" },
  { id: "p6",  name: "Kentang Granola",  category: "umbi",   image:"/products/kentang.jpg",   price: 14000, unit: "kg",           stock: 55, status: "available" },
  { id: "p7",  name: "Ubi Ungu",         category: "umbi",   image:"/products/ubiUngu.jpeg",  price: 12000, unit: "kg",           stock: 18, status: "available" },
  { id: "p8",  name: "Tomat Cherry",     category: "buah",   image:"/products/tomatCery.jpg", price: 12000, unit: "250g",         stock: 6,  status: "low" },
  { id: "p9",  name: "Cabai Merah",      category: "rempah", image:"/products/cabaiMerah.png", price: 28000, unit: "kg",           stock: 22, status: "available" },
  { id: "p10", name: "Bawang Putih",     category: "rempah", image:"/products/bawangPutih.jpg", price: 32000, unit: "kg",           stock: 14, status: "available" },
  { id: "p11", name: "Edamame Rebus",    category: "kacang", image:"/products/edamame.jpg",   price: 8000,  unit: "250g",         stock: 30, status: "available" },
  { id: "p12", name: "Tumis Siap Masak", category: "siap",   image:"/products/tumisan.webp",  price: 15000, unit: "pack",         stock: 12, status: "available" },
];

export const ORDERS: Order[] = [
  { id: "ORD-001", customer: "Siti Rahayu",    items: 3, total: 45000,  status: "pending",    date: "14 Jul 2025" },
  { id: "ORD-002", customer: "Budi Santoso",   items: 5, total: 87000,  status: "processing", date: "14 Jul 2025" },
  { id: "ORD-003", customer: "Dewi Lestari",   items: 2, total: 28000,  status: "done",       date: "13 Jul 2025" },
  { id: "ORD-004", customer: "Andi Wijaya",    items: 7, total: 134000, status: "processing", date: "13 Jul 2025" },
  { id: "ORD-005", customer: "Rina Kusuma",    items: 1, total: 12000,  status: "pending",    date: "12 Jul 2025" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatRupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

