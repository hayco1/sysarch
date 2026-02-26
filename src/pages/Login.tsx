import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"resident" | "staff" | "secretary">("resident");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const username = `${firstName} ${lastName}`;
    console.log("Attempting login with username:", username, "password:", password);
    
    const result = loginUser(username, password);
    console.log("Login result:", result);

    if (result.success && result.user) {
      // Navigate based on role
      if (role === "resident") {
        navigate("/resident");
      } else if (role === "staff") {
        navigate("/staff");
      } else if (role === "secretary") {
        navigate("/secretary");
      }
    } else {
      setError(result.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}></div>
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.placeholder}>🏛️</div>
            <div style={styles.headerText}>
              <p style={styles.headerSmall}>Republic of the Philippines</p>
              <p style={styles.headerSmall}>City of Manila</p>
              <p style={styles.headerTitle}>BARANGAY 420 ZONE 43, DISTRICT IV</p>
              <p style={styles.headerSubtitle}>SAMPALOC, MANILA</p>
              <p style={styles.headerRed}>OFFICE OF THE BARANGAY CHAIRMAN</p>
            </div>
            <div style={styles.placeholder}>🏛️</div>
          </div>
        </div>

        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>LOGIN AS {role.toUpperCase()}</h2>
          
          {error && <div style={styles.errorBox}>{error}</div>}

          <div style={styles.infoBox}>
            <p style={{margin: "0 0 8px 0", fontSize: "12px", fontWeight: "bold"}}>Test Accounts (for demo):</p>
            <p style={{margin: "2px 0", fontSize: "11px"}}>👤 <strong>Resident:</strong> John Smith / Pass: 123456</p>
            <p style={{margin: "2px 0", fontSize: "11px"}}>👥 <strong>Staff:</strong> Jane Staff / Pass: 123456</p>
            <p style={{margin: "2px 0", fontSize: "11px"}}>📊 <strong>Secretary:</strong> Admin Secretary / Pass: 123456</p>
          </div>

          <form style={styles.form} onSubmit={handleLogin}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  placeholder="First"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ ...styles.input, flex: 1 }}
                  disabled={loading}
                  required
                />
                <input
                  type="text"
                  placeholder="Last"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ ...styles.input, flex: 1 }}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password:</label>
              <input
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                disabled={loading}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as "resident" | "staff" | "secretary")}
                style={styles.select}
                disabled={loading}
              >
                <option value="resident">Resident</option>
                <option value="staff">Staff</option>
                <option value="secretary">Secretary</option>
              </select>
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>

          <p style={styles.link}>
            Already have an account? <a href="/register" style={styles.linkText}>Click here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex" as const,
    width: "100vw",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
  },
  sidebar: {
    width: "60px",
    background: "#ff6b35",
    minHeight: "100vh",
  },
  mainContent: {
    flex: 1,
    display: "flex" as const,
    flexDirection: "column" as const,
    background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
  },
  header: {
    background: "white",
    padding: "32px",
    borderBottom: "3px solid #ff6b35",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  },
  headerContent: {
    display: "flex" as const,
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
  },
  placeholder: {
    fontSize: "48px",
    fontWeight: "bold" as const,
    color: "#999",
    width: "80px",
    textAlign: "center" as const,
  },
  headerText: {
    textAlign: "center" as const,
    flex: 1,
  },
  headerSmall: {
    margin: "2px 0",
    fontSize: "11px",
    color: "#333",
  },
  headerTitle: {
    margin: "6px 0",
    fontSize: "14px",
    fontWeight: "bold" as const,
    color: "#333",
  },
  headerSubtitle: {
    margin: "2px 0",
    fontSize: "11px",
    color: "#333",
  },
  headerRed: {
    margin: "6px 0",
    fontSize: "13px",
    fontWeight: "bold" as const,
    color: "#d32f2f",
  },
  formContainer: {
    flex: 1,
    display: "flex" as const,
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },
  formTitle: {
    fontSize: "18px",
    fontWeight: "bold" as const,
    marginBottom: "24px",
    color: "#333",
  },
  form: {
    background: "white",
    padding: "24px",
    borderRadius: "4px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    width: "100%",
    maxWidth: "400px",
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block" as const,
    fontSize: "13px",
    fontWeight: "600" as const,
    marginBottom: "6px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "2px",
    fontSize: "13px",
    boxSizing: "border-box" as const,
    background: "#f9f9f9",
  },
  select: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "2px",
    fontSize: "13px",
    boxSizing: "border-box" as const,
    background: "#f9f9f9",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "2px",
    fontSize: "14px",
    fontWeight: "bold" as const,
    cursor: "pointer",
    marginTop: "12px",
  },
  link: {
    textAlign: "center" as const,
    fontSize: "12px",
    marginTop: "12px",
    color: "#666",
  },
  linkText: {
    color: "#1976d2",
    textDecoration: "underline",
  },
  errorBox: {
    background: "#ffebee",
    color: "#c62828",
    padding: "12px",
    borderRadius: "2px",
    marginBottom: "16px",
    fontSize: "13px",
    border: "1px solid #ef5350",
  },
  infoBox: {
    background: "#e3f2fd",
    color: "#1565c0",
    padding: "12px",
    borderRadius: "2px",
    marginBottom: "16px",
    fontSize: "12px",
    border: "1px solid #90caf9",
  },
};
