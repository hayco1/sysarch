import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogs } from "../services/authService";
import type { ActivityLog } from "../services/authService";
import { useAuth } from "../contexts/useAuth";

export default function ActivityLogs() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [error, setError] = useState("");

  const dashboardPath = useMemo(() => {
    if (user?.role === "secretary") return "/secretary";
    if (user?.role === "staff") return "/staff";
    return "/resident";
  }, [user?.role]);

  useEffect(() => {
    fetchLogs()
      .then((data) => setLogs(data || []))
      .catch(() => setError("Failed to load activity logs"));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h1 style={styles.navTitle}>Barangay 420 - Activity Logs</h1>
        <div>
          <Link to={dashboardPath} style={styles.navLink}>
            Dashboard
          </Link>
          {" | "}
          <Link to="/activity-logs" style={styles.navLink}>
            Activity Logs
          </Link>
          {" | "}
          <button onClick={handleLogout} style={styles.navButton}>
            Logout
          </button>
        </div>
      </nav>

      <div style={styles.content}>
        <h2 style={styles.pageTitle}>System Activity Logs & Audit Trail</h2>
        {error && <p style={styles.errorText}>{error}</p>}

        <table style={styles.table}>
          <thead style={{background: "#1e3c72", color: "white"}}>
            <tr>
              <th style={{padding: "12px", textAlign: "left"}}>Log ID</th>
              <th style={{padding: "12px", textAlign: "left"}}>Activity</th>
              <th style={{padding: "12px", textAlign: "left"}}>User ID</th>
              <th style={{padding: "12px", textAlign: "left"}}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td style={styles.cell}>{log.id}</td>
                <td style={styles.cell}>{log.action}</td>
                <td style={styles.cell}>{log.userId || "-"}</td>
                <td style={styles.cell}>{log.timestamp}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "12px", textAlign: "center", color: "#666" }}>
                  No activity logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    display: "flex" as const,
    flexDirection: "column" as const,
    background: "#f8f9fa",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowX: "hidden" as const,
  },
  navbar: {
    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    color: "white",
    padding: "20px 40px",
    display: "flex" as const,
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  navTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bold" as const,
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 15px",
    fontSize: "14px",
    fontWeight: "500" as const,
  },
  navButton: {
    background: "transparent",
    border: "none",
    color: "white",
    margin: "0 15px",
    padding: 0,
    fontSize: "14px",
    fontWeight: "500" as const,
    cursor: "pointer",
  },
  content: {
    padding: "24px 50px",
    width: "100%",
    margin: "0",
    background: "white",
    borderRadius: "0",
    boxShadow: "none",
    flex: 1,
    overflowY: "auto" as const,
  },
  pageTitle: {
    color: "#1e3c72",
    fontSize: "32px",
    margin: "0 0 10px 0",
    fontWeight: "bold" as const,
  },
  errorText: {
    color: "#c62828",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "20px",
    tableLayout: "fixed" as const,
  },
  cell: {
    padding: "10px 12px",
    overflowWrap: "anywhere" as const,
    wordBreak: "break-word" as const,
    verticalAlign: "top" as const,
  },
};
