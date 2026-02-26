export interface Resident {
  id: number;
  name: string;
  age: number;
  is_pwd: boolean;
  status: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
}

export interface ActivityLog {
  id: number;
  name?: string;
  role?: string;
  action: string;
  timestamp: string;
}

export const mockResidents: Resident[] = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    age: 65,
    is_pwd: false,
    status: "Claimed",
  },
  {
    id: 2,
    name: "Maria Santos",
    age: 62,
    is_pwd: true,
    status: "Pending",
  },
  {
    id: 3,
    name: "Pedro Reyes",
    age: 75,
    is_pwd: true,
    status: "Unclaimed",
  },
  {
    id: 4,
    name: "Ana Garcia",
    age: 70,
    is_pwd: false,
    status: "Claimed",
  },
  {
    id: 5,
    name: "Luis Rodriguez",
    age: 68,
    is_pwd: true,
    status: "Pending",
  },
];

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Basketball League",
    date: "2026-02-28",
    location: "Barangay Hall",
  },
  {
    id: 2,
    title: "Feeding Program",
    date: "2026-03-05",
    location: "Barangay 420",
  },
  {
    id: 3,
    title: "Barangay Assembly Day",
    date: "2026-03-10",
    location: "Sampaloc, Manila",
  },
  {
    id: 4,
    title: "Medical Mission",
    date: "2026-03-15",
    location: "Barangay 420",
  },
  {
    id: 5,
    title: "Sports Relief Program",
    date: "2026-03-20",
    location: "Sports Field",
  },
  {
    id: 6,
    title: "Graduation Ceremony",
    date: "2026-03-25",
    location: "Community Center",
  },
];

export const mockActivityLogs: ActivityLog[] = [
  { 
    id: 1, 
    name: "Elia Cruz",
    role: "Secretary",
    action: "Deactivated User 2", 
    timestamp: "2025-01-15 09:30:00" 
  },
  {
    id: 2,
    name: "Maria Vin",
    role: "Staff",
    action: "Added an Event",
    timestamp: "2025-08-15 09:30:00",
  },
  {
    id: 3,
    name: "Saby Lim",
    role: "Resident",
    action: "Created an account",
    timestamp: "2025-09-15 09:30:00",
  },
];
