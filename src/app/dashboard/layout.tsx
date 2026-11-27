"use client";

import React, { useEffect, useState } from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { apiClient } from "@/shared/lib/apiClient";
import type { UserSession } from "@/features/auth/types/auth.types";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function verifyAndLoadSession() {
      try {
        const user = await apiClient<UserSession>("/api/v1/auth/me");
        if (user && isMounted) {
          setSession(user);
          localStorage.setItem("df_user_session", JSON.stringify(user));
          setIsVerifying(false);
        } else {
          throw new Error("No session found");
        }
      } catch {
        if (isMounted) {
          localStorage.removeItem("df_user_session");
          window.location.replace("/login");
        }
      }
    }

    verifyAndLoadSession();

    // Recuperar preferencia de colapso guardada en el navegador
    const saved = localStorage.getItem("df_sidebar_collapsed");
    if (saved === "true") {
      setIsCollapsed(true);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("df_sidebar_collapsed", String(next));
      return next;
    });
  };

  // Mientras verifica el token activo con el backend, no exponer el dashboard
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
        <div className="p-6 rounded-[16px] bg-white border-3 border-ink shadow-hard flex flex-col items-center gap-4 max-w-sm text-center">
          <div className="w-12 h-12 rounded-[10px] bg-brand-orange border-2 border-ink grid place-items-center shadow-hard-sm">
            <Loader2 className="w-6 h-6 text-ink animate-spin" />
          </div>
          <div>
            <h3 className="font-display text-sm uppercase text-ink">Verificando Sesión Segura</h3>
            <p className="font-mono text-xs text-ink/60 mt-1">Comprobando token activo con el servidor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col lg:flex-row font-body text-ink selection:bg-brand-orange selection:text-ink">
      {/* Sidebar fijo / colapsable con estado interactivo */}
      <DashboardSidebar
        storeName={session?.tenantSlug ? `${session.tenantSlug.toUpperCase()} STORE` : "R&M PERSONALIZA"}
        storeSlug={session?.tenantSlug || "r-m-personaliza"}
        userRole={session?.role || "ROLE_ADMIN"}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />

      {/* Contenedor principal con transición fluida según ancho del sidebar */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:pl-20" : "lg:pl-72"
        }`}
      >
        {/* Barra superior de estado */}
        <header className="hidden lg:flex sticky top-0 z-30 h-16 bg-white border-b-2 border-ink px-6 items-center justify-between shadow-hard-sm">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider px-2 py-0.5 rounded-[6px] bg-paper border border-ink">
              PANEL DE COMERCIO
            </span>
            <span className="text-ink/30 font-mono">/</span>
            <span className="font-mono text-xs text-ink/70">
              despachafacil.com/tienda/{session?.tenantSlug || "r-m-personaliza"}
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="text-right">
              {/* Nombre de su negocio más grande */}
              <span className="font-display text-sm uppercase text-ink block leading-none tracking-tight">
                {session?.tenantName || "R&M PERSONALIZA"}
              </span>
              {/* Usuario y rol dinámico */}
              <div className="mt-1 flex items-center justify-end gap-1.5 font-mono text-[11px]">
                <span className="text-ink/70 font-medium">
                  {session?.fullName || "Colaborador"}
                </span>
                <span className="text-ink/30">•</span>
                <span className={`px-1.5 py-0.2 rounded-[4px] text-ink font-bold border border-ink text-[10px] uppercase ${
                  session?.role === "ROLE_ADMIN" 
                    ? "bg-teal" 
                    : session?.role === "ROLE_DISPATCHER" 
                    ? "bg-brand-orange" 
                    : "bg-paper"
                }`}>
                  {session?.role === "ROLE_ADMIN"
                    ? "ADMIN"
                    : session?.role === "ROLE_DISPATCHER"
                    ? "DESPACHO"
                    : "OPERADOR"}
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-[10px] bg-black border-2 border-ink grid place-items-center font-display text-white text-sm shadow-hard-sm">
              {(session?.fullName || session?.tenantName || "DF").substring(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Contenido dinámico */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
