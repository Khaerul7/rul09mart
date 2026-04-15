import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rul09Mart — Sayuran Segar",
  description: "Belanja sayuran segar berkualitas, langsung dari kebun ke meja makanmu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
