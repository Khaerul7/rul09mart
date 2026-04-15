# Rul09Mart 🥬

Aplikasi e-commerce sayuran segar dengan Admin Dashboard.

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (cart state management)
- **Lucide React** (icons)

## Struktur Folder

```
app/
├── page.tsx              → Landing Page Customer
├── layout.tsx            → Root layout
├── globals.css           → Global styles
├── data.ts               → Data dummy & types
├── store.ts              → Zustand cart store
├── components/
│   ├── Navbar.tsx        → Navbar sticky
│   ├── Hero.tsx          → Hero section + ilustrasi SVG
│   ├── CategoryFilter.tsx→ Filter kategori
│   ├── ProductCard.tsx   → Card produk
│   └── CartDrawer.tsx    → Keranjang + checkout WhatsApp
└── admin/
    ├── layout.tsx        → Admin layout wrapper
    ├── AdminLayout.tsx   → Sidebar + navigation
    ├── page.tsx          → Dashboard overview
    ├── produk/page.tsx   → Manajemen produk
    ├── pesanan/page.tsx  → Daftar pesanan
    ├── kategori/page.tsx → Manajemen kategori
    ├── promosi/page.tsx  → Kode promo
    └── pengaturan/page.tsx→ Pengaturan toko
```

## Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Buka browser
# Customer: http://localhost:3000
# Admin:    http://localhost:3000/admin
```

## Fitur

### Customer (/)
- Sticky navbar dengan search, wishlist, notifikasi, keranjang
- Hero section promo + ilustrasi SVG sayuran
- Filter kategori interaktif (Sayuran Daun, Umbi, Buah Sayur, dll)
- Grid produk dengan badge diskon
- Keranjang belanja (Zustand) dengan drawer
- Checkout langsung via WhatsApp

### Admin (/admin)
- Sidebar collapsible dengan navigasi lengkap
- Stats cards (penjualan, pesanan, stok menipis, pelanggan baru)
- Tabel inventori dengan filter kategori
- Manajemen produk (CRUD UI)
- Daftar pesanan dengan status filter
- Manajemen kategori & promosi
- Pengaturan toko

## Kustomisasi

### Ubah nomor WhatsApp
Di `app/components/CartDrawer.tsx`, ubah nomor di:
```typescript
window.open(`https://wa.me/6281234567890?text=...`)
```

### Tambah produk
Edit `app/data.ts` di array `PRODUCTS`.

### Warna brand
Di `tailwind.config.ts` bagian `theme.extend.colors`.

## Deployment
```bash
npm run build
# Deploy ke Vercel: vercel --prod
```
