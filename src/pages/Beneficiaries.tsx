import { Link } from "react-router-dom";
import { mockResidents } from "../data/mockData";

export default function Beneficiaries() {
  const beneficiaries = mockResidents.filter(
    (resident) => resident.age >= 60 || resident.is_pwd
  );

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h1 style={styles.navTitle}>Barangay 420 - Beneficiaries</h1>
        <div>
          <Link to="/resident" style={styles.navLink}>
            Home
          </Link>
          {" | "}
          <Link to="/events" style={styles.navLink}>
            Events
          </Link>
          {" | "}
          <Link to="/" style={styles.navLink}>
            Logout
          </Link>
        </div>
      </nav>

      <div style={styles.content}>
        <h2 style={styles.pageTitle}>Eligible Beneficiaries</h2>
        <p style={styles.subtitle}>
          Total eligible beneficiaries: <strong style={{color: "#2a5298", fontSize: "18px"}}>{beneficiaries.length}</strong>
        </p>

        <table style={styles.table}>
          <thead style={{background: "#1e3c72", color: "white"}}>
            <tr>
              <th style={{padding: "12px", textAlign: "left"}}>Name</th>
              <th style={{padding: "12px", textAlign: "center"}}>Age</th>
              <th style={{padding: "12px", textAlign: "center"}}>PWD</th>
              <th style={{padding: "12px", textAlign: "left"}}>Qualification</th>
              <th style={{padding: "12px", textAlign: "center"}}>Status</th>
              <th style={{padding: "12px", textAlign: "center"}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaries.map((resident) => (
              <tr key={resident.id} style={{color: '#333'}}>
                <td>{resident.name}</td>
                <td style={{textAlign: "center"}}>{resident.age}</td>
                <td style={{textAlign: "center"}}>{resident.is_pwd ? "✓" : "-"}</td>
                <td>
                  {resident.age >= 60 && resident.is_pwd
                    ? "Senior & PWD"
                    : resident.age >= 60
                    ? "Senior Citizen"
                    : "PWD"}
                </td>
                <td style={{textAlign: "center"}}>
                  <span
                    style={{
                      padding: "8px 14px",
                      background:
                        resident.status === "Claimed" ? "#51cf66" : "#ff922b",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: "bold" as const,
                      color: "white",
                    }}
                  >
                    {resident.status}
                  </span>
                </td>
                <td style={{textAlign: "center"}}>
                  <button style={styles.smallButton}>View</button>
                </td>
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
  subtitle: {
    color: "#666",
    fontSize: "15px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "20px",
    borderTop: "2px solid #1e3c72",
  },
  smallButton: {
    padding: "10px 18px",
    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold" as const,
    transition: "all 0.3s ease" as const,
  },
};
