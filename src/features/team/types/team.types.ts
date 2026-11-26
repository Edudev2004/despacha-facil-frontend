export interface TeamMember {
  id: string;
  tenantId: string;
  fullName: string;
  email: string;
  role: "ROLE_ADMIN" | "ROLE_OPERATOR" | "ROLE_DISPATCHER";
  isActive: boolean;
  createdAt: string;
}

export interface CreateTeamMemberInput {
  fullName: string;
  email: string;
  password: string;
  role: "ROLE_ADMIN" | "ROLE_OPERATOR" | "ROLE_DISPATCHER";
}

export interface UpdateTeamMemberInput {
  fullName?: string;
  role?: "ROLE_ADMIN" | "ROLE_OPERATOR" | "ROLE_DISPATCHER";
  isActive?: boolean;
}
