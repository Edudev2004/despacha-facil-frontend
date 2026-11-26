"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Shield,
  Truck,
  CheckCircle2,
  XCircle,
  X,
  Sparkles,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { apiClient } from "@/shared/lib/apiClient";
import type { TeamMember, CreateTeamMemberInput } from "@/features/team/types/team.types";

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ROLE_OPERATOR" | "ROLE_DISPATCHER" | "ROLE_ADMIN">("ROLE_OPERATOR");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const loadTeam = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient<TeamMember[]>("/api/v1/users");
      setMembers(data);
    } catch {
      // Si no tiene permisos de admin, redirigir elegantemente a la zona no autorizada
      window.location.href = "/dashboard/acceso-restringido";
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleToggleActive = async (member: TeamMember) => {
    try {
      const updated = await apiClient<TeamMember>(`/api/v1/users/${member.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: !member.isActive }),
      });
      setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al actualizar estado");
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = "Ingresa nombre completo (mínimo 3 caracteres)";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = "Ingresa un correo electrónico válido";
    }
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!password || !pwdRegex.test(password)) {
      errs.password = "Mínimo 8 caracteres, al menos una letra y un número";
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload: CreateTeamMemberInput = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
      };

      const created = await apiClient<TeamMember>("/api/v1/users", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setMembers((prev) => [created, ...prev]);
      setIsModalOpen(false);
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("ROLE_OPERATOR");
    } catch (err) {
      setGeneralError(err instanceof Error ? err.message : "Error al registrar colaborador");
    } finally {
      setSubmitting(false);
    }
  };

  const getRoleBadge = (userRole: string) => {
    switch (userRole) {
      case "ROLE_ADMIN":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] bg-teal text-ink font-mono text-xs font-bold border border-ink">
            <Shield className="w-3.5 h-3.5" /> ADMINISTRADOR
          </span>
        );
      case "ROLE_DISPATCHER":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] bg-brand-orange text-ink font-mono text-xs font-bold border border-ink">
            <Truck className="w-3.5 h-3.5" /> DESPACHADOR
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] bg-paper text-ink font-mono text-xs font-bold border border-ink">
            <Users className="w-3.5 h-3.5" /> OPERADOR EN VIVO
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Cabecera del Módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-[20px] border-3 border-ink bg-white shadow-hard">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[6px] bg-paper border border-ink font-mono text-[11px] font-bold text-ink">
            <Users className="w-3.5 h-3.5 text-brand-orange" />
            <span>MÓDULO 01 // EQUIPO & ACCESOS</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl uppercase text-ink tracking-tight leading-none">
            EQUIPO Y COLABORADORES
          </h1>
          <p className="font-body text-xs sm:text-sm text-ink/70">
            Administra los accesos para tus operadores de Live y empacadores de bodega.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          className="shrink-0 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>AÑADIR COLABORADOR</span>
        </Button>
      </div>

      {/* Tabla de Miembros del Equipo */}
      <div className="rounded-[20px] border-3 border-ink bg-white shadow-hard overflow-hidden">
        {isLoading ? (
          <div className="p-12 grid place-items-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
            <span className="mt-3 font-mono text-xs font-bold uppercase text-ink">
              Cargando equipo...
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-paper border-b-2 border-ink font-mono text-xs uppercase tracking-wider text-ink font-bold">
                  <th className="py-3.5 px-4 sm:px-6">COLABORADOR</th>
                  <th className="py-3.5 px-4 sm:px-6">ROL EN TIENDA</th>
                  <th className="py-3.5 px-4 sm:px-6">ESTADO</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-ink/10 font-body text-sm text-ink">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-paper/50 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[10px] bg-brand-orange border-2 border-ink grid place-items-center font-display text-sm text-ink shadow-hard-sm shrink-0">
                          {member.fullName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="truncate">
                          <span className="font-bold text-ink block leading-tight truncate">
                            {member.fullName}
                          </span>
                          <span className="font-mono text-xs text-ink/60 truncate block">
                            {member.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 sm:px-6">
                      {getRoleBadge(member.role)}
                    </td>

                    <td className="py-4 px-4 sm:px-6">
                      {member.isActive ? (
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="w-4 h-4" /> ACTIVO
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-brand-coral">
                          <XCircle className="w-4 h-4" /> INACTIVO
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-right">
                      {member.role !== "ROLE_ADMIN" ? (
                        <button
                          onClick={() => handleToggleActive(member)}
                          className={`px-3 py-1.5 rounded-[8px] border-2 border-ink font-mono text-xs font-bold uppercase transition-all shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                            member.isActive
                              ? "bg-paper text-ink hover:bg-brand-coral hover:text-white"
                              : "bg-teal text-ink hover:bg-teal/80"
                          }`}
                        >
                          {member.isActive ? "DESACTIVAR" : "ACTIVAR"}
                        </button>
                      ) : (
                        <span className="font-mono text-[11px] text-ink/50 font-bold uppercase">
                          PROPIETARIO
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Neo-Brutalista para Crear Colaborador */}
      {isModalOpen && (
        <div className="fixed inset-0 z-60 bg-ink/70 backdrop-blur-xs grid place-items-center p-4">
          <div className="w-full max-w-lg bg-white rounded-[24px] border-3 border-ink shadow-hard-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b-2 border-ink bg-brand-orange flex items-center justify-between text-left">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-ink fill-ink" />
                <h3 className="font-display text-lg uppercase text-ink tracking-tight">
                  NUEVO COLABORADOR
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-[8px] border-2 border-ink bg-white text-ink shadow-hard-sm active:translate-x-[1px] active:translate-y-[1px]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreate} className="p-6 space-y-4 text-left" noValidate>
              {generalError && (
                <div className="p-3 rounded-[10px] bg-brand-coral text-white border-2 border-ink font-mono text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{generalError}</span>
                </div>
              )}

              <Input
                label="NOMBRE COMPLETO"
                name="fullName"
                placeholder="Pedro Gómez"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (formErrors.fullName) setFormErrors((p) => ({ ...p, fullName: "" }));
                }}
                error={formErrors.fullName}
              />

              <Input
                label="CORREO ELECTRÓNICO"
                name="email"
                type="email"
                placeholder="pedro@tumarca.pe"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formErrors.email) setFormErrors((p) => ({ ...p, email: "" }));
                }}
                error={formErrors.email}
              />

              <Input
                label="CONTRASEÑA TEMPORAL (MÍNIMO 8 CARACTERES)"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (formErrors.password) setFormErrors((p) => ({ ...p, password: "" }));
                }}
                error={formErrors.password}
              />

              {/* Selector de Rol */}
              <div className="space-y-1.5 text-left">
                <label className="font-mono text-xs font-bold uppercase text-ink block">
                  ROL Y PERMISOS
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("ROLE_OPERATOR")}
                    className={`p-3 rounded-[12px] border-2 text-left transition-all ${
                      role === "ROLE_OPERATOR"
                        ? "bg-brand-orange border-ink shadow-hard-sm ring-2 ring-ink text-ink"
                        : "bg-white border-ink/30 hover:border-ink"
                    }`}
                  >
                    <span className="font-display text-xs uppercase text-ink block">
                      OPERADOR
                    </span>
                    <span className="font-body text-[11px] text-ink/70 block mt-0.5 leading-tight">
                      Controla ventas en Lives y apartados de 20 min.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("ROLE_DISPATCHER")}
                    className={`p-3 rounded-[12px] border-2 text-left transition-all ${
                      role === "ROLE_DISPATCHER"
                        ? "bg-brand-orange border-ink shadow-hard-sm ring-2 ring-ink text-ink"
                        : "bg-white border-ink/30 hover:border-ink"
                    }`}
                  >
                    <span className="font-display text-xs uppercase text-ink block">
                      DESPACHADOR
                    </span>
                    <span className="font-body text-[11px] text-ink/70 block mt-0.5 leading-tight">
                      Empaque, etiquetas y guías Shalom/Olva.
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto"
                >
                  CANCELAR
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={submitting}
                  className="w-full sm:w-auto"
                >
                  GUARDAR COLABORADOR
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
