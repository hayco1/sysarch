import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogs } from "../services/authService";
import type { ActivityLog } from "../services/authService";
import { useAuth } from "../contexts/useAuth";
import PortalHeader from "../components/PortalHeader";

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
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <PortalHeader
        rightLabel="Activity Logs"
        actions={
          <>
            <Link to={dashboardPath} style={styles.headerAction}>Dashboard</Link>
            <Link to="/activity-logs" style={styles.headerAction}>Logs</Link>
            <button onClick={handleLogout} style={styles.headerButton}>Logout</button>
          </>
        }
      />

      <div style={styles.content}>
        <h2 style={styles.pageTitle}>System Activity Logs & Audit Trail</h2>
        {error && <p style={styles.errorText}>{error}</p>}

        <table style={styles.table}>
          <thead style={{ background: "#1e3c72", color: "white" }}>
            <tr>
              <th style={{ padding: "12px", textAlign: "left" }}>Log ID</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Activity</th>
              <th style={{ padding: "12px", textAlign: "left" }}>User ID</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Timestamp</th>
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
    background: "#edf4fb",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowX: "hidden" as const,
  },
  headerAction: {
    padding: "7px 10px",
    borderRadius: "999px",
    background: "#eef6ff",
    color: "#2f7fbe",
    fontSize: "12px",
    fontWeight: 700,
    textDecoration: "none",
  },
  headerButton: {
    padding: "7px 10px",
    borderRadius: "999px",
    background: "#eef6ff",
    color: "#2f7fbe",
    fontSize: "12px",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
  },
  content: {
    padding: "24px 50px",
    width: "100%",
    margin: "0",
    background: "rgba(255,255,255,0.96)",
    borderRadius: "12px",
    boxShadow: "0 18px 36px rgba(58, 95, 130, 0.12)",
    border: "1px solid rgba(145, 180, 210, 0.24)",
    flex: 1,
    overflowY: "auto" as const,
  },
  pageTitle: {
    color: "#275173",
    fontSize: "32px",
    margin: "0 0 10px 0",
    fontWeight: "bold" as const,
  },
  errorText: {
    color: "#bc4a38",
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
