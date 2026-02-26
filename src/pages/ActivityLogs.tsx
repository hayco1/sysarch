import { Link } from "react-router-dom";
import { mockActivityLogs } from "../data/mockData";

export default function ActivityLogs() {
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h1 style={styles.navTitle}>Barangay 420 - Activity Logs</h1>
        <div>
          <Link to="/staff" style={styles.navLink}>
            Dashboard
          </Link>
          {" | "}
          <Link to="/activity-logs" style={styles.navLink}>
            Activity Logs
          </Link>
          {" | "}
          <Link to="/" style={styles.navLink}>
            Logout
          </Link>
        </div>
      </nav>

      <div style={styles.content}>
        <h2 style={styles.pageTitle}>System Activity Logs & Audit Trail</h2>

        <table style={styles.table}>
          <thead style={{background: "#1e3c72", color: "white"}}>
            <tr>
              <th style={{padding: "12px", textAlign: "left"}}>Log ID</th>
              <th style={{padding: "12px", textAlign: "left"}}>Activity</th>
              <th style={{padding: "12px", textAlign: "left"}}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {mockActivityLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.action}</td>
                <td>{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex" as const,
    flexDirection: "column" as const,
    background: "#f8f9fa",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
  content: {
    padding: "40px 50px",
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
    marginBottom: "10px",
    fontWeight: "bold" as const,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "20px",
  },
};
