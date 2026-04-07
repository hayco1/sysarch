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
  imageUrl: string;
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
    imageUrl: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Feeding Program",
    date: "2026-03-05",
    location: "Barangay 420",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Barangay Assembly Day",
    date: "2026-03-10",
    location: "Sampaloc, Manila",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Medical Mission",
    date: "2026-03-15",
    location: "Barangay 420",
    imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Sports Relief Program",
    date: "2026-03-20",
    location: "Sports Field",
    imageUrl: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "Graduation Ceremony",
    date: "2026-03-25",
    location: "Community Center",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
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
