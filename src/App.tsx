import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResidentDashboard from "./pages/ResidentDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import SecretaryDashboard from "./pages/SecretaryDashboard";
import Events from "./pages/Events";
import Beneficiaries from "./pages/Beneficiaries";
import ActivityLogs from "./pages/ActivityLogs";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/useAuth";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  if (!ready) {
    return null;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function RequireRole({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: Array<"resident" | "staff" | "secretary"> }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return null;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    const fallbackRoute = user.role === "secretary" ? "/secretary" : user.role === "staff" ? "/staff" : "/resident";
    return <Navigate to={fallbackRoute} replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/resident"
            element={<RequireRole allowedRoles={["resident"]}><ResidentDashboard /></RequireRole>}
          />
          <Route
            path="/staff"
            element={<RequireRole allowedRoles={["staff"]}><StaffDashboard /></RequireRole>}
          />
          <Route
            path="/secretary"
            element={<RequireRole allowedRoles={["secretary"]}><SecretaryDashboard /></RequireRole>}
          />
          <Route
            path="/events"
            element={<RequireAuth><Events /></RequireAuth>}
          />
          <Route
            path="/beneficiaries"
            element={<RequireAuth><Beneficiaries /></RequireAuth>}
          />
          <Route
            path="/activity-logs"
            element={<RequireRole allowedRoles={["secretary"]}><ActivityLogs /></RequireRole>}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
