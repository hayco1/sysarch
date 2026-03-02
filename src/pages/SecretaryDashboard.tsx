import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createResident, deleteResident, fetchResidents, updateResident } from "../services/authService";
import type { Resident } from "../services/authService";

type ResidentForm = Omit<Resident, "id">;

const INITIAL_FORM: ResidentForm = { name: "", age: 0, is_pwd: false, status: "Pending" };

export default function SecretaryDashboard() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [editing, setEditing] = useState<Resident | null>(null);
  const [form, setForm] = useState<ResidentForm>(INITIAL_FORM);
  const [error, setError] = useState("");

  async function reloadResidents() {
    try {
      const data = await fetchResidents();
      setResidents(data || []);
    } catch {
      setError("Failed to load residents");
    }
  }

  useEffect(() => {
    fetchResidents()
      .then((data) => {
        setResidents(data || []);
      })
      .catch(() => {
        setError("Failed to load residents");
      });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editing) {
        await updateResident(editing.id, form);
      } else {
        await createResident(form);
      }
      setForm(INITIAL_FORM);
      setEditing(null);
      await reloadResidents();
    } catch {
      setError("Save failed");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this resident?")) return;
    try {
      await deleteResident(id);
      await reloadResidents();
    } catch {
      setError("Delete failed");
    }
  }

  function startEdit(r: Resident) {
    setEditing(r);
    setForm({ name: r.name, age: r.age, is_pwd: r.is_pwd, status: r.status });
  }

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h1 style={styles.navTitle}>Barangay 420 - Secretary Dashboard</h1>
        <div>
          <Link to="/secretary" style={styles.navLink}>Dashboard</Link>
          {" | "}
          <Link to="/activity-logs" style={styles.navLink}>Activity Logs</Link>
          {" | "}
          <Link to="/" style={styles.navLink}>Logout</Link>
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Beneficiaries Management</h2>

          {error && <div style={{ color: "red" }}>{error}</div>}

          <form onSubmit={handleSave} style={{ marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: (e.target as HTMLInputElement).value })} />
            <input placeholder="Age" type="number" value={form.age} onChange={(e) => setForm({ ...form, age: Number((e.target as HTMLInputElement).value) })} style={{ width: 80 }} />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: (e.target as HTMLSelectElement).value })}>
              <option>Pending</option>
              <option>Claimed</option>
            </select>
            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input type="checkbox" checked={form.is_pwd} onChange={(e) => setForm({ ...form, is_pwd: (e.target as HTMLInputElement).checked })} /> PWD
            </label>
            <button type="submit" style={styles.smallButton}>{editing ? "Update" : "Add"}</button>
            {editing && (
              <button type="button" onClick={() => { setEditing(null); setForm(INITIAL_FORM); }}>Cancel</button>
            )}
          </form>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>PWD</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td style={{ textAlign: "center" }}>{r.age}</td>
                  <td style={{ textAlign: "center" }}>{r.is_pwd ? "Yes" : "No"}</td>
                  <td>{r.status}</td>
                  <td>
                    <button style={styles.smallButton} onClick={() => startEdit(r)}>Edit</button>
                    <button style={{ ...styles.smallButton, marginLeft: 8, background: "#ff6b6b" }} onClick={() => handleDelete(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.backupSection}>
          <h2>System Backup</h2>
          <a href="http://localhost:4000/api/backup" target="_blank" rel="noreferrer"><button style={styles.buttonPrimary}>📥 Export JSON Backup</button></a>
          <p style={{ marginTop: 8 }}>Use the API endpoint to import/export backups.</p>
        </div>
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
    background: "#f5f5f5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  navbar: {
    background: "#1e3c72",
    color: "white",
    padding: "16px 24px",
    display: "flex" as const,
    justifyContent: "space-between",
    alignItems: "center",
  },
  navTitle: { margin: 0, fontSize: "18px" },
  navLink: { color: "white", textDecoration: "none", margin: "0 8px" },
  content: { padding: "24px", width: "100%", margin: 0, display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 },
  section: { background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" },
  backupSection: { background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" },
  table: { width: "100%", borderCollapse: "collapse" as const, marginTop: "12px" },
  smallButton: { padding: "6px 10px", background: "#2a5298", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  buttonPrimary: { padding: "10px 16px", background: "#2a5298", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: 600 },
  sectionHeading: { color: "#1e3c72", fontSize: "18px", marginBottom: "12px", fontWeight: 600 },
} as const;
