import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResidentDashboard from "./pages/ResidentDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import SecretaryDashboard from "./pages/SecretaryDashboard";
import Events from "./pages/Events";
import Beneficiaries from "./pages/Beneficiaries";
import ActivityLogs from "./pages/ActivityLogs";

function App() {
  return (
    <Router>
      <div className="page-center">
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resident" element={<ResidentDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/secretary" element={<SecretaryDashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
        <Route path="/activity-logs" element={<ActivityLogs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
