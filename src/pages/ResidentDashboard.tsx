import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockEvents } from "../data/mockData";
import { fetchMyResident, saveMyResident, type Resident } from "../services/authService";
import { useAuth } from "../contexts/useAuth";
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

function getAgeFromBirthDate(birthDate: string) {
  if (!birthDate) return 0;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  if (!hasBirthdayPassed) age -= 1;
  return Math.max(age, 0);
}

export default function ResidentDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState<"events" | "census">("events");
  const [form, setForm] = useState<ResidentForm>({
    ...INITIAL_FORM,
    userId: user?.id || "",
    name: user?.username || "",
    email: user?.email || "",
  });
  const [recordId, setRecordId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user) return;
    setForm((current) => ({
      ...current,
      userId: user.id,
      name: current.name || user.username || "",
      email: current.email || user.email || "",
    }));
  }, [user]);

  useEffect(() => {
    let mounted = true;
    async function loadCensus() {
      try {
        const resident = await fetchMyResident();
        if (!mounted) return;
        if (resident) {
          setRecordId(resident.id);
          setForm({
            ...INITIAL_FORM,
            ...resident,
            userId: resident.userId || user?.id || "",
            name: resident.name || user?.username || "",
            email: resident.email || user?.email || "",
          });
        }
      } catch {
        if (mounted) setError("Failed to load your census data");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadCensus();
    return () => {
      mounted = false;
    };
  }, [user?.email, user?.id, user?.username]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const currentEvent = mockEvents[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload: ResidentForm = {
        ...form,
        userId: user?.id || form.userId,
        name: form.name.trim(),
        email: form.email?.trim() || user?.email || "",
        age: form.birthDate ? getAgeFromBirthDate(form.birthDate) : Number(form.age),
      };
      const saved = await saveMyResident(payload);
      setRecordId(saved.id);
      setForm({ ...INITIAL_FORM, ...saved });
      setSuccess("Census form saved successfully");
    } catch {
      setError("Failed to save census form");
    } finally {
      setSaving(false);
    }
  }

  function updateForm<K extends keyof ResidentForm>(key: K, value: ResidentForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}></div>

      <div style={styles.mainContent}>
        <PortalHeader rightLabel="Resident" />

        <div style={styles.tabsContainer}>
          <button
            style={{ ...styles.tab, ...(currentTab === "events" ? styles.tabActive : {}) }}
            onClick={() => setCurrentTab("events")}
          >
            HOME
          </button>
          <button
            style={{ ...styles.tab, ...(currentTab === "census" ? styles.tabActive : {}) }}
            onClick={() => setCurrentTab("census")}
          >
            CENSUS FORM
          </button>
          <button style={styles.tab} onClick={handleLogout}>
            LOGOUT
          </button>
        </div>

        <div style={styles.contentArea}>
          {currentTab === "events" && (
            <div style={styles.eventDetailSection}>
              <h2 style={styles.eventTitle}>{currentEvent?.title || "Basketball League"}</h2>
              <img
                src={currentEvent?.imageUrl || "https://via.placeholder.com/400x250?text=Event+Image"}
                alt="Event"
                style={styles.eventImage}
              />
              <p style={styles.eventDate}>
                {currentEvent?.date ? new Date(currentEvent.date).toLocaleDateString() : "Dec 21, 2024"}
              </p>
              <p style={styles.eventDescription}>
                Check ongoing barangay activities and submit your census profile so the secretary can
                review and update your household record when needed.
              </p>
            </div>
          )}

          {currentTab === "census" && (
            <form style={styles.censusForm} onSubmit={handleSubmit}>
              <div style={styles.formHeader}>
                <div>
                  <h2 style={styles.formTitle}>Resident Census Form</h2>
                  <p style={styles.formSubtitle}>
                    {recordId ? "Update your existing household profile." : "Complete your household profile."}
                  </p>
                </div>
                <div style={styles.statusChip}>{recordId ? "Saved Record" : "New Record"}</div>
              </div>

              {loading && <div style={styles.infoBox}>Loading existing census data...</div>}
              {error && <div style={styles.errorBox}>{error}</div>}
              {success && <div style={styles.successBox}>{success}</div>}

              <div style={styles.formGrid}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Contact Number</label>
                  <input
                    type="text"
                    value={form.contactNumber}
                    onChange={(e) => updateForm("contactNumber", e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Household Number</label>
                  <input
                    type="text"
                    value={form.household}
                    onChange={(e) => updateForm("household", e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={{ ...styles.fieldGroup, gridColumn: "1 / -1" }}>
                  <label style={styles.label}>Address</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Number of Household Members</label>
                  <input
                    type="number"
                    min="1"
                    value={form.membersCount}
                    onChange={(e) => updateForm("membersCount", Number(e.target.value))}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Birth Date</label>
                  <input
                    type="date"
                    value={form.birthDate}
                    onChange={(e) => {
                      const birthDate = e.target.value;
                      updateForm("birthDate", birthDate);
                      updateForm("age", getAgeFromBirthDate(birthDate));
                    }}
                    style={styles.input}
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Age</label>
                  <input type="number" value={form.age} onChange={(e) => updateForm("age", Number(e.target.value))} style={styles.input} min="0" />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Gender</label>
                  <select value={form.gender} onChange={(e) => updateForm("gender", e.target.value)} style={styles.input}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Civil Status</label>
                  <select value={form.civilStatus} onChange={(e) => updateForm("civilStatus", e.target.value)} style={styles.input}>
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                  </select>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Occupation</label>
                  <input
                    type="text"
                    value={form.occupation}
                    onChange={(e) => updateForm("occupation", e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Citizenship</label>
                  <input
                    type="text"
                    value={form.citizenship}
                    onChange={(e) => updateForm("citizenship", e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Beneficiary Status</label>
                  <input type="text" value={form.status || "Pending"} style={styles.input} disabled />
                  <p style={styles.helperText}>Only the admin or secretary can update this status.</p>
                </div>
                <label style={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    checked={form.is_pwd}
                    onChange={(e) => updateForm("is_pwd", e.target.checked)}
                  />
                  Person with disability (PWD)
                </label>
                <div style={{ ...styles.fieldGroup, gridColumn: "1 / -1" }}>
                  <label style={styles.label}>Remarks</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => updateForm("notes", e.target.value)}
                    style={styles.textarea}
                    rows={4}
                  />
                </div>
              </div>

              <div style={styles.formActions}>
                <button type="submit" style={styles.submitButton} disabled={saving || loading}>
                  {saving ? "Saving..." : "Save Census Form"}
                </button>
              </div>
            </form>
          )}
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
    background: "#edf4fb",
  },
  sidebar: {
    width: "60px",
    background: "linear-gradient(180deg, #ff885b 0%, #f06a3b 100%)",
    minHeight: "100vh",
  },
  mainContent: {
    flex: 1,
    display: "flex" as const,
    flexDirection: "column" as const,
    background: "linear-gradient(135deg, #eef6fd 0%, #e4eef7 100%)",
  },
  tabsContainer: {
    display: "flex" as const,
    gap: "8px",
    padding: "12px 24px",
    background: "rgba(255,255,255,0.92)",
    borderBottom: "2px solid #f3a17a",
    boxShadow: "0 8px 18px rgba(61, 95, 128, 0.06)",
  },
  tab: {
    padding: "10px 18px",
    backgroundColor: "#7db5dc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold" as const,
  },
  tabActive: {
    backgroundColor: "#2f7fbe",
  },
  contentArea: {
    flex: 1,
    padding: "32px 40px",
    overflowY: "auto" as const,
  },
  eventDetailSection: {
    maxWidth: "680px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.96)",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 18px 36px rgba(58, 95, 130, 0.12)",
    border: "1px solid rgba(145, 180, 210, 0.24)",
  },
  eventTitle: {
    fontSize: "24px",
    fontWeight: "bold" as const,
    marginBottom: "16px",
    color: "#243b53",
  },
  eventImage: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover" as const,
    borderRadius: "8px",
    marginBottom: "16px",
  },
  eventDate: {
    fontSize: "12px",
    color: "#607489",
    marginBottom: "16px",
  },
  eventDescription: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#4e6175",
  },
  censusForm: {
    maxWidth: "960px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.96)",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 18px 36px rgba(58, 95, 130, 0.12)",
    border: "1px solid rgba(145, 180, 210, 0.24)",
  },
  formHeader: {
    display: "flex" as const,
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },
  formTitle: {
    fontSize: "22px",
    fontWeight: "bold" as const,
    margin: 0,
    color: "#275173",
  },
  formSubtitle: {
    margin: "6px 0 0",
    color: "#666",
    fontSize: "14px",
  },
  statusChip: {
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#edf6ff",
    color: "#2f7fbe",
    fontWeight: "bold" as const,
    fontSize: "12px",
  },
  infoBox: {
    background: "#edf6ff",
    color: "#2f7fbe",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  errorBox: {
    background: "#fff3f2",
    color: "#b42318",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  successBox: {
    background: "#eef9f1",
    color: "#166534",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  formGrid: {
    display: "grid" as const,
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  fieldGroup: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600" as const,
    color: "#29445d",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #c9d9e7",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box" as const,
    background: "#f8fbff",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #c9d9e7",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box" as const,
    resize: "vertical" as const,
  },
  checkboxGroup: {
    display: "flex" as const,
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: "#29445d",
    paddingTop: "24px",
  },
  helperText: {
    margin: 0,
    fontSize: "12px",
    color: "#607489",
  },
  formActions: {
    display: "flex" as const,
    justifyContent: "flex-end",
    marginTop: "24px",
  },
  submitButton: {
    padding: "12px 18px",
    background: "linear-gradient(135deg, #4d9fda 0%, #2f7fbe 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold" as const,
    boxShadow: "0 10px 18px rgba(47, 127, 190, 0.2)",
  },
} as const;
