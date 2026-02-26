// Simple authentication service using localStorage

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "resident" | "staff" | "secretary";
}

// Reset/initialize auth data
function initializeAuthData() {
  const defaultUsers: User[] = [
    {
      id: "1",
      username: "John Smith",
      email: "john@barangay.gov",
      password: "123456",
      role: "resident",
    },
    {
      id: "2",
      username: "Jane Staff",
      email: "staff@barangay.gov",
      password: "123456",
      role: "staff",
    },
    {
      id: "3",
      username: "Admin Secretary",
      email: "secretary@barangay.gov",
      password: "123456",
      role: "secretary",
    },
  ];
  localStorage.removeItem("barangay_users");
  localStorage.setItem("barangay_users", JSON.stringify(defaultUsers));
  return defaultUsers;
}

// Get all registered users from localStorage
export function getAllUsers(): User[] {
  try {
    const users = localStorage.getItem("barangay_users");
    
    if (!users) {
      return initializeAuthData();
    }
    
    const parsedUsers = JSON.parse(users);
    
    // If data is empty or invalid, reset with defaults
    if (!Array.isArray(parsedUsers) || parsedUsers.length === 0) {
      return initializeAuthData();
    }
    
    // Validate users have required fields
    const validUsers = parsedUsers.filter(u => u.username && u.password);
    if (validUsers.length === 0) {
      return initializeAuthData();
    }
    
    return validUsers;
  } catch (e) {
    console.error("Error parsing users:", e);
    return initializeAuthData();
  }
}

// Register a new user
export function registerUser(username: string, email: string, password: string, confirmPassword: string, role: string): { success: boolean; error?: string } {
  // Validation
  if (!username.trim()) {
    return { success: false, error: "Username is required" };
  }
  if (!email.trim()) {
    return { success: false, error: "Email is required" };
  }
  if (!password || password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" };
  }
  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  const users = getAllUsers();

  // Check if user already exists
  if (users.some((u) => u.username === username)) {
    return { success: false, error: "Username already exists" };
  }
  if (users.some((u) => u.email === email)) {
    return { success: false, error: "Email already registered" };
  }

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    username,
    email,
    password, // In production, hash this!
    role: (role as "resident" | "staff" | "secretary") || "resident",
  };

  // Save user
  users.push(newUser);
  localStorage.setItem("barangay_users", JSON.stringify(users));

  return { success: true };
}

// Login user
export function loginUser(username: string, password: string): { success: boolean; user?: User; error?: string } {
  if (!username.trim()) {
    return { success: false, error: "Username is required" };
  }
  if (!password) {
    return { success: false, error: "Password is required" };
  }

  const users = getAllUsers();
  console.log("Available users:", users.map(u => u.username));
  console.log("Looking for username:", username);
  
  const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());

  if (!user) {
    return { success: false, error: "User not found. Please register first." };
  }

  if (user.password !== password) {
    return { success: false, error: "Incorrect password" };
  }

  return { success: true, user };
}

// Check if user exists
export function userExists(username: string): boolean {
  const users = getAllUsers();
  return users.some((u) => u.username === username);
}
