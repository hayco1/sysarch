// Authentication service communicating with backend API

export type Role = "resident" | "staff" | "secretary";

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
}

export interface Resident {
  id: string;
  userId?: string;
  name: string;
  email?: string;
  contactNumber?: string;
  address: string;
  household: string;
  membersCount: number;
  age: number;
  birthDate?: string;
  gender?: string;
  civilStatus?: string;
  occupation?: string;
  is_pwd: boolean;
  citizenship?: string;
  notes?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Program {
  id: string;
  [key: string]: unknown;
}

export interface ActivityLog {
  id: string;
  action: string;
  userId: string;
  timestamp: string;
}

export interface RegisterPayload {
  username: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  address?: string;
  password: string;
  role: Role;
}

interface AuthSuccessResponse {
  token: string;
  user: User;
}

interface ApiError {
  error: string;
}

function isApiError(value: unknown): value is ApiError {
  return typeof value === "object" && value !== null && "error" in value && typeof (value as { error: unknown }).error === "string";
}

function getErrorMessage(value: unknown, fallback: string): string {
  return isApiError(value) ? value.error : fallback;
}

const API_ROOT = import.meta.env.VITE_API_ROOT ?? "/api";

async function request<TResponse>(path: string, options: RequestInit = {}): Promise<TResponse> {
  const token = localStorage.getItem("auth_token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  let res: Response;
  try {
    res = await fetch(API_ROOT + path, { ...options, headers: { ...headers, ...(options.headers as Record<string, string> | undefined) } });
  } catch {
    throw { error: "Cannot connect to the API server. Start `npm run server` and keep the frontend dev server running." } satisfies ApiError;
  }
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data as TResponse;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    await request<{ success: boolean }>("/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: getErrorMessage(err, "Registration failed") };
  }
}

export async function loginUser(
  username: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const result = await request<AuthSuccessResponse>("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if (result.token) {
      localStorage.setItem("auth_token", result.token);
      return { success: true, user: result.user };
    }
    return { success: false, error: "No token received" };
  } catch (err: unknown) {
    return { success: false, error: getErrorMessage(err, "Login failed") };
  }
}

export function logout() {
  localStorage.removeItem("auth_token");
}

export async function fetchResidents() {
  return await request<Resident[]>("/residents");
}

export async function createResident(resident: Omit<Resident, "id">) {
  return await request<Resident>("/residents", { method: "POST", body: JSON.stringify(resident) });
}

export async function updateResident(id: string, resident: Omit<Resident, "id">) {
  return await request<Resident>(`/residents/${id}`, { method: "PUT", body: JSON.stringify(resident) });
}

export async function deleteResident(id: string) {
  return await request<{ success: boolean }>(`/residents/${id}`, { method: "DELETE" });
}

export async function fetchMyResident() {
  return await request<Resident | null>("/residents/me");
}

export async function saveMyResident(resident: Omit<Resident, "id">) {
  return await request<Resident>("/residents/me", { method: "POST", body: JSON.stringify(resident) });
}

export async function fetchPrograms() {
  return await request<Program[]>("/programs");
}

export async function fetchBeneficiaries() {
  return await request<Resident[]>("/beneficiaries");
}

export async function fetchLogs() {
  return await request<ActivityLog[]>("/logs");
}

// helper
export function isLoggedIn() {
  return !!localStorage.getItem("auth_token");
}
