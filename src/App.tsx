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
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
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
            element={<RequireAuth><ResidentDashboard /></RequireAuth>}
          />
          <Route
            path="/staff"
            element={<RequireAuth><StaffDashboard /></RequireAuth>}
          />
          <Route
            path="/secretary"
            element={<RequireAuth><SecretaryDashboard /></RequireAuth>}
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
            element={<RequireAuth><ActivityLogs /></RequireAuth>}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
