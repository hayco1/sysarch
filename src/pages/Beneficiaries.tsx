import { Link } from "react-router-dom";
import { mockResidents } from "../data/mockData";
import PortalHeader from "../components/PortalHeader";

export default function Beneficiaries() {
  const beneficiaries = mockResidents.filter(
    (resident) => resident.age >= 60 || resident.is_pwd
  );

  return (
    <div style={styles.container}>
      <PortalHeader
        rightLabel="Beneficiaries"
        actions={
          <>
            <Link to="/resident" style={styles.headerAction}>Home</Link>
            <Link to="/events" style={styles.headerAction}>Events</Link>
            <Link to="/login" style={styles.headerAction}>Logout</Link>
          </>
        }
      />

      <div style={styles.content}>
        <h2 style={styles.pageTitle}>Eligible Beneficiaries</h2>
        <p style={styles.subtitle}>
          Total eligible beneficiaries: <strong style={{ color: "#2a5298", fontSize: "18px" }}>{beneficiaries.length}</strong>
        </p>

        <table style={styles.table}>
          <thead style={{ background: "#1e3c72", color: "white" }}>
            <tr>
              <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "12px", textAlign: "center" }}>Age</th>
              <th style={{ padding: "12px", textAlign: "center" }}>PWD</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Qualification</th>
              <th style={{ padding: "12px", textAlign: "center" }}>Status</th>
              <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaries.map((resident) => (
              <tr key={resident.id} style={{ color: "#333" }}>
                <td>{resident.name}</td>
                <td style={{ textAlign: "center" }}>{resident.age}</td>
                <td style={{ textAlign: "center" }}>{resident.is_pwd ? "Yes" : "-"}</td>
                <td>
                  {resident.age >= 60 && resident.is_pwd
                    ? "Senior & PWD"
                    : resident.age >= 60
                      ? "Senior Citizen"
                      : "PWD"}
                </td>
                <td style={{ textAlign: "center" }}>
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
                <td style={{ textAlign: "center" }}>
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
    background: "#edf4fb",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
  content: {
    padding: "40px 50px",
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
    marginBottom: "10px",
    fontWeight: "bold" as const,
  },
  subtitle: {
    color: "#607489",
    fontSize: "15px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "20px",
    borderTop: "2px solid #7db5dc",
  },
  smallButton: {
    padding: "10px 18px",
    background: "linear-gradient(135deg, #4d9fda 0%, #2f7fbe 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold" as const,
    transition: "all 0.3s ease" as const,
    boxShadow: "0 10px 18px rgba(47, 127, 190, 0.18)",
  },
};
