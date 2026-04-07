import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createResident, deleteResident, fetchResidents, updateResident } from "../services/authService";
import type { Resident } from "../services/authService";
import PortalHeader from "../components/PortalHeader";

type ResidentForm = Omit<Resident, "id">;

const INITIAL_FORM: ResidentForm = {
  userId: "",
  name: "",
  email: "",
  contactNumber: "",
  address: "",
  household: "",
  membersCount: 1,
  age: 0,
  birthDate: "",
  gender: "",
  civilStatus: "",
  occupation: "",
  is_pwd: false,
  citizenship: "Filipino",
  notes: "",
  status: "Pending",
  createdAt: "",
  updatedAt: "",
};

export default function SecretaryDashboard() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [editing, setEditing] = useState<Resident | null>(null);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [form, setForm] = useState<ResidentForm>(INITIAL_FORM);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function reloadResidents() {
    try {
      const data = await fetchResidents();
      setResidents(data || []);
      if (selectedResident) {
        const nextSelected = (data || []).find((resident) => resident.id === selectedResident.id) || null;
        setSelectedResident(nextSelected);
      }
    } catch {
      setError("Failed to load census records");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reloadResidents();
  }, []);

  function updateForm<K extends keyof ResidentForm>(key: K, value: ResidentForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
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
    if (!confirm("Delete this census record?")) return;
    try {
      await deleteResident(id);
      if (selectedResident?.id === id) setSelectedResident(null);
      await reloadResidents();
    } catch {
      setError("Delete failed");
    }
  }

  function startEdit(resident: Resident) {
    setEditing(resident);
    setSelectedResident(resident);
    setForm({ ...INITIAL_FORM, ...resident });
  }

  return (
    <div style={styles.container}>
      <PortalHeader
        rightLabel="Secretary"
        actions={
          <>
            <Link to="/secretary" style={styles.headerAction}>Dashboard</Link>
            <Link to="/activity-logs" style={styles.headerAction}>Logs</Link>
            <Link to="/login" style={styles.headerAction}>Logout</Link>
          </>
        }
      />

      <div style={styles.content}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionHeading}>Resident Census Records</h2>
              <p style={styles.sectionSubheading}>View, edit, or create census entries submitted by residents.</p>
            </div>
            <div style={styles.countBadge}>{residents.length} records</div>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}
          {loading && <div style={styles.infoBox}>Loading census records...</div>}

          <form onSubmit={handleSave} style={styles.form}>
            <div style={styles.formGrid}>
              <input placeholder="Full Name" value={form.name} onChange={(e) => updateForm("name", e.target.value)} style={styles.input} required />
              <input placeholder="Email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} style={styles.input} />
              <input placeholder="Contact Number" value={form.contactNumber} onChange={(e) => updateForm("contactNumber", e.target.value)} style={styles.input} />
              <input placeholder="Household Number" value={form.household} onChange={(e) => updateForm("household", e.target.value)} style={styles.input} required />
              <input placeholder="Address" value={form.address} onChange={(e) => updateForm("address", e.target.value)} style={{ ...styles.input, gridColumn: "1 / -1" }} required />
              <input placeholder="Members" type="number" min="1" value={form.membersCount} onChange={(e) => updateForm("membersCount", Number(e.target.value))} style={styles.input} />
              <input placeholder="Birth Date" type="date" value={form.birthDate} onChange={(e) => updateForm("birthDate", e.target.value)} style={styles.input} />
              <input placeholder="Age" type="number" min="0" value={form.age} onChange={(e) => updateForm("age", Number(e.target.value))} style={styles.input} />
              <select value={form.gender} onChange={(e) => updateForm("gender", e.target.value)} style={styles.input}>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <select value={form.civilStatus} onChange={(e) => updateForm("civilStatus", e.target.value)} style={styles.input}>
                <option value="">Civil Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>
              <input placeholder="Occupation" value={form.occupation} onChange={(e) => updateForm("occupation", e.target.value)} style={styles.input} />
              <input placeholder="Citizenship" value={form.citizenship} onChange={(e) => updateForm("citizenship", e.target.value)} style={styles.input} />
              <select value={form.status} onChange={(e) => updateForm("status", e.target.value)} style={styles.input}>
                <option value="Pending">Pending</option>
                <option value="Claimed">Claimed</option>
              </select>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" checked={form.is_pwd} onChange={(e) => updateForm("is_pwd", e.target.checked)} />
                PWD
              </label>
              <textarea
                placeholder="Remarks"
                value={form.notes}
                onChange={(e) => updateForm("notes", e.target.value)}
                style={{ ...styles.input, minHeight: 96, gridColumn: "1 / -1", resize: "vertical" as const }}
              />
            </div>

            <div style={styles.formActions}>
              <button type="submit" style={styles.smallButton}>{editing ? "Update Record" : "Add Record"}</button>
              {editing && (
                <button type="button" onClick={() => { setEditing(null); setForm(INITIAL_FORM); }} style={styles.secondaryButton}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Household</th>
                <th>Address</th>
                <th>Age</th>
                <th>PWD</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident) => (
                <tr key={resident.id}>
                  <td>{resident.name}</td>
                  <td>{resident.household}</td>
                  <td>{resident.address}</td>
                  <td style={{ textAlign: "center" }}>{resident.age}</td>
                  <td style={{ textAlign: "center" }}>{resident.is_pwd ? "Yes" : "No"}</td>
                  <td>{resident.status}</td>
                  <td>
                    <button style={styles.smallButton} onClick={() => setSelectedResident(resident)}>View</button>
                    <button style={{ ...styles.smallButton, marginLeft: 8 }} onClick={() => startEdit(resident)}>Edit</button>
                    <button style={{ ...styles.deleteButton, marginLeft: 8 }} onClick={() => handleDelete(resident.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.sidebarColumn}>
          <div style={styles.backupSection}>
            <h2 style={styles.panelTitle}>Census Details</h2>
            {selectedResident ? (
              <div style={styles.detailList}>
                <p><strong>Name:</strong> {selectedResident.name}</p>
                <p><strong>Email:</strong> {selectedResident.email || "-"}</p>
                <p><strong>Contact:</strong> {selectedResident.contactNumber || "-"}</p>
                <p><strong>Household:</strong> {selectedResident.household || "-"}</p>
                <p><strong>Members:</strong> {selectedResident.membersCount}</p>
                <p><strong>Address:</strong> {selectedResident.address || "-"}</p>
                <p><strong>Birth Date:</strong> {selectedResident.birthDate || "-"}</p>
                <p><strong>Gender:</strong> {selectedResident.gender || "-"}</p>
                <p><strong>Civil Status:</strong> {selectedResident.civilStatus || "-"}</p>
                <p><strong>Occupation:</strong> {selectedResident.occupation || "-"}</p>
                <p><strong>Citizenship:</strong> {selectedResident.citizenship || "-"}</p>
                <p><strong>PWD:</strong> {selectedResident.is_pwd ? "Yes" : "No"}</p>
                <p><strong>Status:</strong> {selectedResident.status}</p>
                <p><strong>Remarks:</strong> {selectedResident.notes || "-"}</p>
              </div>
            ) : (
              <p style={styles.mutedText}>Select a census record to view its full details here.</p>
            )}
          </div>

          <div style={styles.backupSection}>
            <h2 style={styles.panelTitle}>System Backup</h2>
            <a href="http://localhost:4000/api/backup" target="_blank" rel="noreferrer">
              <button style={styles.buttonPrimary}>Export JSON Backup</button>
            </a>
            <p style={styles.mutedText}>Use the API endpoint to import or export the current system state.</p>
          </div>
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
    padding: "24px",
    width: "100%",
    margin: 0,
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 340px",
    gap: 24,
    boxSizing: "border-box" as const,
  },
  section: {
    background: "rgba(255,255,255,0.96)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 18px 36px rgba(58, 95, 130, 0.12)",
    border: "1px solid rgba(145, 180, 210, 0.24)",
  },
  sidebarColumn: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 24,
  },
  backupSection: {
    background: "rgba(255,255,255,0.96)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 18px 36px rgba(58, 95, 130, 0.12)",
    border: "1px solid rgba(145, 180, 210, 0.24)",
  },
  sectionHeader: {
    display: "flex" as const,
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: "12px",
  },
  countBadge: {
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#edf6ff",
    color: "#2f7fbe",
    fontWeight: 700,
    fontSize: "12px",
  },
  sectionHeading: { color: "#275173", fontSize: "20px", marginBottom: "4px", fontWeight: 600 },
  sectionSubheading: { margin: 0, color: "#667085", fontSize: "14px" },
  panelTitle: { marginTop: 0, color: "#275173", fontSize: "18px" },
  table: { width: "100%", borderCollapse: "collapse" as const, marginTop: "16px" },
  smallButton: { padding: "6px 10px", background: "#2f7fbe", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "12px", boxShadow: "0 8px 16px rgba(47, 127, 190, 0.14)" },
  secondaryButton: { padding: "6px 10px", background: "#eef3f8", color: "#29445d", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "12px" },
  deleteButton: { padding: "6px 10px", background: "#d36256", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "12px" },
  buttonPrimary: { padding: "10px 16px", background: "#2f7fbe", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: 600, boxShadow: "0 10px 18px rgba(47, 127, 190, 0.16)" },
  form: { marginBottom: 20, display: "flex" as const, flexDirection: "column" as const, gap: 16 },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 },
  input: { width: "100%", padding: "10px 12px", border: "1px solid #c9d9e7", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" as const, background: "#f8fbff" },
  checkboxLabel: { display: "flex" as const, alignItems: "center", gap: 8, fontSize: "14px", color: "#344054" },
  formActions: { display: "flex" as const, gap: 8 },
  detailList: { display: "grid", gap: 10, color: "#344054", fontSize: "14px" },
  mutedText: { color: "#667085", fontSize: "14px", lineHeight: 1.5 },
  errorBox: { background: "#fff3f2", color: "#bc4a38", padding: "12px", borderRadius: "8px", marginBottom: "12px", border: "1px solid #f1b4ac" },
  infoBox: { background: "#edf6ff", color: "#2f7fbe", padding: "12px", borderRadius: "8px", marginBottom: "12px", border: "1px solid #cfe4f7" },
} as const;
