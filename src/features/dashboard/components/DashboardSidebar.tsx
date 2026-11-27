"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiClient } from "@/shared/lib/apiClient";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Truck,
  Tags,
  Users,
  Settings,
  ExternalLink,
  Menu,
  X,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  tag?: string;
  tagColor?: string;
  allowedRoles?: Array<"ROLE_ADMIN" | "ROLE_OPERATOR" | "ROLE_DISPATCHER">;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Panel Principal", href: "/dashboard", icon: LayoutDashboard },
  { label: "Catálogo & Stock", href: "/dashboard/productos", icon: Package, tag: "0 u.", tagColor: "bg-teal", allowedRoles: ["ROLE_ADMIN", "ROLE_OPERATOR"] },
  { label: "Pedidos & Lives", href: "/dashboard/pedidos", icon: ShoppingBag, tag: "NUEVO", tagColor: "bg-brand-orange", allowedRoles: ["ROLE_ADMIN", "ROLE_OPERATOR"] },
  { label: "Despachos & Courier", href: "/dashboard/despachos", icon: Truck, allowedRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER"] },
  { label: "Categorías", href: "/dashboard/categorias", icon: Tags, allowedRoles: ["ROLE_ADMIN"] },
  { label: "Equipo & Roles", href: "/dashboard/equipo", icon: Users, allowedRoles: ["ROLE_ADMIN"] },
  { label: "Ajustes de Marca", href: "/dashboard/configuracion", icon: Settings, allowedRoles: ["ROLE_ADMIN"] },
];

export function DashboardSidebar({
  storeName = "Mi Tienda",
  storeSlug = "tienda",
  userRole = "ROLE_ADMIN",
  isCollapsed = false,
  onToggleCollapse,
}: {
  storeName?: string;
  storeSlug?: string;
  userRole?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("df_user_session");
      await apiClient("/api/v1/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    window.location.replace("/login");
  };

  return (
    <>
      {/* Barra móvil superior (< lg) */}
      <header className="lg:hidden sticky top-0 z-40 w-full bg-paper border-b-2 border-ink px-4 py-2.5 flex items-center justify-between shadow-hard-sm">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/despacha-facil-logo.webp"
            alt="Despacha Fácil"
            width={160}
            height={36}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Abrir navegación"
          className="p-2 rounded-[8px] border-2 border-ink bg-white text-ink shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Overlay móvil */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-ink/60 backdrop-blur-xs"
        />
      )}

      {/* Sidebar Desktop y Móvil */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-paper border-r-3 border-ink flex flex-col justify-between transition-all duration-300 ease-in-out ${
          /* Desktop Width */
          isCollapsed ? "lg:w-20" : "lg:w-72"
        } ${
          /* Mobile Drawer */
          isMobileOpen ? "w-72 translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Botón flotante para Colapsar/Expandir en Desktop */}
        <button
          onClick={onToggleCollapse}
          title={isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
          className="hidden lg:flex absolute -right-3.5 top-5 z-60 w-7 h-7 rounded-full bg-white border-2 border-ink shadow-hard-sm items-center justify-center text-ink hover:bg-brand-orange transition-colors active:translate-x-[1px] active:translate-y-[1px]"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Cabecera Sidebar */}
        <div className="p-3.5 sm:p-4 border-b-2 border-ink bg-white">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center overflow-hidden">
              {!isCollapsed ? (
                /* Logo completo oficial (ya incluye isotipo y nombre Despacha Fácil) */
                <Image
                  src="/despacha-facil-logo.webp"
                  alt="Despacha Fácil"
                  width={180}
                  height={42}
                  className="h-9 w-auto object-contain"
                  priority
                />
              ) : (
                /* Solo Isotipo para la versión simplificada/colapsada */
                <div className="w-10 h-10 rounded-[10px] overflow-hidden grid place-items-center">
                  <Image
                    src="/df-isotipo.webp"
                    alt="DF"
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                    priority
                  />
                </div>
              )}
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1 rounded-[6px] border border-ink"
            >
              <X className="w-4 h-4 text-ink" />
            </button>
          </div>

          {/* Tarjeta de Tienda Activa */}
          {!isCollapsed ? (
            <div className="mt-3.5 p-3 rounded-[12px] bg-paper border-2 border-ink shadow-hard-sm">
              <div className="flex items-center justify-between text-left">
                <div className="truncate pr-2">
                  <span className="font-mono text-[9px] font-bold uppercase text-ink/70 block">
                    TIENDA ACTIVA
                  </span>
                  <span className="font-body font-bold text-xs sm:text-sm text-ink truncate block">
                    {storeName}
                  </span>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-teal text-ink font-mono text-[9px] font-bold border border-ink">
                  LIVE
                </span>
              </div>
              <Link
                href={`/tienda/${storeSlug}`}
                target="_blank"
                className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-ink hover:text-brand-orange underline underline-offset-2 transition-colors"
              >
                <span>Ver catálogo</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <div className="mt-3 grid place-items-center">
              <Link
                href={`/tienda/${storeSlug}`}
                target="_blank"
                title={`Ver catálogo (${storeName})`}
                className="w-9 h-9 rounded-[8px] bg-paper border-2 border-ink grid place-items-center text-ink hover:bg-teal shadow-hard-sm"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Lista de Navegación con Filtrado por Rol */}
        <nav className="flex-1 px-2.5 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.filter(
            (item) => !item.allowedRoles || item.allowedRoles.includes(userRole as "ROLE_ADMIN" | "ROLE_OPERATOR" | "ROLE_DISPATCHER")
          ).map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const num = `0${idx + 1}`;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                title={isCollapsed ? item.label : undefined}
                className={`group flex items-center ${
                  isCollapsed ? "justify-center px-2 py-3" : "justify-between px-3.5 py-2.5"
                } rounded-[10px] border-2 transition-all font-body text-xs uppercase tracking-wider font-bold ${
                  isActive
                    ? "bg-brand-orange text-ink border-ink shadow-hard-sm"
                    : "bg-transparent text-ink/80 border-transparent hover:bg-white hover:border-ink hover:text-ink hover:shadow-hard-sm"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {!isCollapsed && (
                    <span className="font-mono text-[10px] text-ink/50 group-hover:text-ink font-bold shrink-0 whitespace-nowrap">
                      [{num}]
                    </span>
                  )}
                  <Icon className="w-4 h-4 shrink-0 text-ink" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!isCollapsed && item.tag && (
                  <span
                    className={`px-1.5 py-0.5 rounded-[6px] font-mono text-[9px] font-bold border border-ink text-ink ${
                      item.tagColor || "bg-white"
                    }`}
                  >
                    {item.tag}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar: Plan y Logout */}
        <div className="p-3 border-t-2 border-ink bg-white space-y-2">
          {!isCollapsed ? (
            <div className="p-2.5 rounded-[10px] bg-paper border-2 border-ink flex items-center justify-between text-left">
              <div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
                  <span className="font-mono text-[10px] font-bold text-ink uppercase">
                    PRUEBA 7 DÍAS
                  </span>
                </div>
                <span className="font-mono text-[10px] text-ink/70">
                  Plan Emprendedor
                </span>
              </div>
              <button className="px-2 py-1 rounded-[6px] border border-ink bg-brand-orange font-mono text-[10px] font-bold text-ink shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px]">
                PRO
              </button>
            </div>
          ) : (
            <div className="grid place-items-center py-1">
              <span
                title="Plan Prueba (7 días)"
                className="w-8 h-8 rounded-[8px] bg-brand-orange border-2 border-ink grid place-items-center shadow-hard-sm"
              >
                <Sparkles className="w-4 h-4 text-ink" />
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            title={isCollapsed ? "Cerrar sesión" : undefined}
            className={`w-full py-2 ${
              isCollapsed ? "px-1 justify-center" : "px-3 justify-center"
            } rounded-[8px] border-2 border-ink bg-paper text-ink font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-brand-coral hover:text-white transition-all shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {!isCollapsed && <span>CERRAR SESIÓN</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
