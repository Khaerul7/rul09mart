"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid, Package, ClipboardList, Tag, BadgePercent, Settings, LogOut,
} from "lucide-react";
import clsx from "clsx";
import { useAuthStore } from "./authStore";

const navItems = [
  { label: "Overview",    href: "/admin",            icon: LayoutGrid   },
  { label: "Produk",      href: "/admin/produk",     icon: Package      },
  { label: "Pesanan",     href: "/admin/pesanan",    icon: ClipboardList, badge: 27 },
  { label: "Kategori",    href: "/admin/kategori",   icon: Tag          },
  { label: "Promosi",     href: "/admin/promosi",    icon: BadgePercent },
  { label: "Pengaturan",  href: "/admin/pengaturan", icon: Settings     },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { isLoggedIn, logout, checkSession } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (!isLoggedIn && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [isLoggedIn, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-400 text-[13px]">
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          Memeriksa sesi...
        </div>
      </div>
    );
  }

  function handleLogout() {
    logout();
    router.replace("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className={clsx("flex flex-col bg-[#0f2744] flex-shrink-0 transition-all duration-300", collapsed ? "w-[60px]" : "w-[180px]")}>
        <div className={clsx("px-[18px] py-5 border-b border-white/[0.06]", collapsed && "px-3")}>
          {collapsed ? (
            <button onClick={() => setCollapsed(false)} className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-[11px] font-bold">R9</button>
          ) : (
            <div>
              <button onClick={() => setCollapsed(true)} className="text-[14px] font-bold text-white tracking-tight block">Rul09Mart</button>
              <span className="text-[10px] text-[#4a7fa5] uppercase tracking-widest">Admin Panel</span>
            </div>
          )}
        </div>

        <nav className="flex-1 py-3">
          {!collapsed && <p className="text-[9px] text-[#345878] uppercase tracking-widest font-semibold px-[18px] mb-1.5 mt-1">Menu</p>}
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-2.5 px-[18px] py-2.5 text-[12px] transition-all duration-150 border-l-2 group",
                  collapsed && "px-0 justify-center",
                  active
                    ? "text-white bg-sky-400/10 border-l-sky-400"
                    : "text-[#7aa3c0] border-l-transparent hover:text-[#e2eef6] hover:bg-white/[0.04]"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={15} strokeWidth={1.7} className={clsx("flex-shrink-0", active ? "text-sky-400" : "text-[#4a7fa5] group-hover:text-[#7aa3c0]")} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-amber-400 text-amber-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        <div className={clsx("px-[18px] py-4 border-t border-white/[0.06]", collapsed && "px-3 flex justify-center")}>
          {collapsed ? (
            <button onClick={handleLogout} title="Keluar" className="w-7 h-7 rounded-full bg-[#1a4a7a] flex items-center justify-center text-[10px] font-bold text-[#7aa3c0] hover:text-red-400 transition-colors">AR</button>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1a4a7a] flex items-center justify-center text-[10px] font-bold text-[#7aa3c0] flex-shrink-0">AR</div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-[#e2eef6] font-medium truncate">Admin Rul</p>
                <p className="text-[9px] text-[#4a7fa5] truncate">admin@rul09.id</p>
              </div>
              <button onClick={handleLogout} title="Keluar" className="text-[#4a7fa5] hover:text-red-400 transition-colors">
                <LogOut size={13} strokeWidth={1.7}/>
              </button>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-[#f4f6f9] min-w-0">
        {children}
      </main>
    </div>
  );
}
