import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockActivityLogs, mockResidents, type ActivityLog, type Resident } from "../data/mockData";

export default function SecretaryDashboard() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<
    "logs" | "accounts" | "residents" | "beneficiaries" | "statistics" | "criteria"
  >("logs");
  const [beneficiaryFilter, setBeneficiaryFilter] = useState("all");

  const handleLogout = () => {
    navigate("/");
  };

  // Filter beneficiaries
  const seniorCitizens = mockResidents.filter((r: Resident) => r.age >= 60);
  const pwdResidents = mockResidents.filter((r: Resident) => r.is_pwd);
  
  const filteredBeneficiaries =
    beneficiaryFilter === "senior"
      ? seniorCitizens
      : beneficiaryFilter === "pwd"
        ? pwdResidents
        : beneficiaryFilter === "claimed"
          ? seniorCitizens.filter((r) => r.status === "claimed")
          : [];

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

        <div style={styles.tabsContainer}>
          {["logs", "accounts", "residents", "beneficiaries", "statistics", "criteria"].map(
            (tab) => (
              <button
                key={tab}
                style={{
                  ...styles.tab,
                  ...(currentTab === tab ? styles.tabActive : {}),
                }}
                onClick={() => setCurrentTab(tab as typeof currentTab)}
              >
                {tab.toUpperCase()}
              </button>
            )
          )}
          <button style={styles.tab} onClick={handleLogout}>
            LOGOUT
          </button>
        </div>

        <div style={styles.contentArea}>
          {currentTab === "logs" && (
            <div>
              <h2 style={styles.title}>Activity Logs</h2>
              <table style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Role</th>
                    <th style={styles.th}>Timestamp</th>
                    <th style={styles.th}>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {mockActivityLogs.map((log: ActivityLog) => (
                    <tr key={log.id}>
                      <td style={styles.td}>{log.name || "N/A"}</td>
                      <td style={styles.td}>{log.role || "N/A"}</td>
                      <td style={styles.td}>{log.timestamp}</td>
                      <td style={styles.td}>{log.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {currentTab === "accounts" && (
            <div>
              <h2 style={styles.title}>User Account Management</h2>
              <div style={styles.searchContainer}>
                <input type="text" placeholder="Search Name, Role, Contact Number" style={styles.searchInput} />
              </div>
              <table style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Role</th>
                    <th style={styles.th}>Contact #</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockResidents.slice(0, 3).map((resident: Resident) => (
                    <tr key={resident.id}>
                      <td style={styles.td}>{resident.name}</td>
                      <td style={styles.td}>{"Staff"}</td>
                      <td style={styles.td}>{"09XXXXXXXXX"}</td>
                      <td style={styles.td}>
                        <button style={styles.actionButton}>DEACTIVATE</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {currentTab === "residents" && (
            <div>
              <h2 style={styles.title}>Registered Residents of Barangay 420</h2>
              <div style={styles.filterContainer}>
                <select style={styles.filterSelect} defaultValue="all">
                  <option value="all">Filter</option>
                </select>
              </div>
              <table style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th style={styles.th}>Action</th>
                    <th style={styles.th}>Last Name</th>
                    <th style={styles.th}>First Name</th>
                    <th style={styles.th}>Middle Name</th>
                    <th style={styles.th}>Ext</th>
                    <th style={styles.th}>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {mockResidents.map((resident: Resident) => (
                    <tr key={resident.id}>
                      <td style={styles.td}>
                        <button style={styles.viewButton}>VIEW</button>
                      </td>
                      <td style={styles.td}>{resident.name.split(" ")[1] || "---"}</td>
                      <td style={styles.td}>{resident.name.split(" ")[0]}</td>
                      <td style={styles.td}>{"---"}</td>
                      <td style={styles.td}>{"---"}</td>
                      <td style={styles.td}>{resident.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button style={styles.addButton}>ADD</button>
            </div>
          )}

          {currentTab === "beneficiaries" && (
            <div>
              <h2 style={styles.title}>Senior Citizen Beneficiaries</h2>
              <div style={styles.filterContainer}>
                <select
                  style={styles.filterSelect}
                  value={beneficiaryFilter}
                  onChange={(e) => setBeneficiaryFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="senior">Senior Citizens</option>
                  <option value="pwd">PWD</option>
                  <option value="claimed">Claimed</option>
                </select>
                <input type="text" placeholder="Enter name, age, contact number..." style={styles.searchInput} />
              </div>
              <table style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Age</th>
                    <th style={styles.th}>Contact #</th>
                    <th style={styles.th}>Address</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(beneficiaryFilter === "all" ? seniorCitizens : filteredBeneficiaries).map((res: Resident) => (
                    <tr key={res.id}>
                      <td style={styles.td}>{res.name}</td>
                      <td style={styles.td}>{res.age}</td>
                      <td style={styles.td}>{"09XXXXXXXXX"}</td>
                      <td style={styles.td}>{"123 Brgy 420, Sampaloc"}</td>
                      <td style={styles.td}>{res.status || "Pending"}</td>
                      <td style={styles.td}>{"2025-01-15"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button style={styles.saveButton}>SAVE</button>
            </div>
          )}

          {currentTab === "statistics" && (
            <div>
              <h2 style={styles.title}>Barangay 420 Population Profile</h2>
              <table style={styles.statsTable}>
                <tbody>
                  <tr>
                    <td style={styles.statsLabel}>Age Group</td>
                    <td style={styles.statsLabel}>Number of Population</td>
                    <td style={styles.statsLabel}>No. of Household</td>
                  </tr>
                  <tr>
                    <td style={styles.statsValue}>Child (0 - 17 y/o)</td>
                    <td style={styles.statsValue}>96</td>
                    <td style={styles.statsValue}></td>
                  </tr>
                  <tr>
                    <td style={styles.statsValue}>Adult (18 - 59 y/o)</td>
                    <td style={styles.statsValue}>175</td>
                    <td style={styles.statsValue}></td>
                  </tr>
                  <tr>
                    <td style={styles.statsValue}>Senior (60 y/o & above)</td>
                    <td style={styles.statsValue}>35</td>
                    <td style={styles.statsValue}></td>
                  </tr>
                </tbody>
              </table>
              <div style={styles.demographicsContainer}>
                <div style={styles.demographicsCard}>
                  <div>408</div>
                  <div>Total Population</div>
                </div>
                <div style={styles.demographicsCard}>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "24px" }}>👩</div>
                      <div>Female</div>
                      <div>193</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "24px" }}>👨</div>
                      <div>Male</div>
                      <div>114</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === "criteria" && (
            <div>
              <h2 style={styles.title}>Beneficiary Programs & Criteria</h2>
              <table style={styles.criteriaTable}>
                <tbody>
                  <tr style={styles.criteriaRow}>
                    <td>1. Senior Citizen Allowance</td>
                  </tr>
                  <tr style={styles.criteriaRow}>
                    <td>2. PWD Assistance</td>
                  </tr>
                  <tr style={styles.criteriaRow}>
                    <td>3. Education Assistance</td>
                  </tr>
                </tbody>
              </table>
              <button style={styles.addButton}>ADD</button>
            </div>
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
    background: "#f5f5f5",
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
  tabsContainer: {
    display: "flex" as const,
    gap: "8px",
    padding: "12px 24px",
    background: "white",
    borderBottom: "2px solid #ff6b35",
    overflowX: "auto" as const,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  tab: {
    padding: "8px 16px",
    backgroundColor: "#ff9966",
    color: "white",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold" as const,
    whiteSpace: "nowrap" as const,
  },
  tabActive: {
    backgroundColor: "#ff6b35",
  },
  contentArea: {
    flex: 1,
    padding: "32px 40px",
    overflowY: "auto" as const,
    background: "linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold" as const,
    marginBottom: "20px",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    backgroundColor: "white",
    borderRadius: "4px",
    overflow: "hidden",
    marginTop: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  thead: {
    backgroundColor: "#ff6b35",
    color: "white",
    boxShadow: "0 2px 4px rgba(255, 107, 53, 0.2)",
  },
  th: {
    padding: "12px",
    textAlign: "left" as const,
    fontSize: "12px",
    fontWeight: "bold" as const,
  },
  td: {
    padding: "10px 12px",
    fontSize: "12px",
    borderBottom: "1px solid #e0e0e0",
    color: "#333",
  },
  searchContainer: {
    marginBottom: "16px",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "2px",
    fontSize: "12px",
    boxSizing: "border-box" as const,
  },
  filterContainer: {
    display: "flex" as const,
    gap: "12px",
    marginBottom: "16px",
    alignItems: "center",
  },
  filterSelect: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "2px",
    fontSize: "12px",
    cursor: "pointer",
  },
  actionButton: {
    padding: "6px 12px",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "bold" as const,
  },
  viewButton: {
    padding: "6px 12px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "bold" as const,
  },
  addButton: {
    padding: "10px 16px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold" as const,
    marginTop: "16px",
  },
  saveButton: {
    padding: "10px 16px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold" as const,
    marginTop: "16px",
  },
  statsTable: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "10px",
    background: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  statsLabel: {
    padding: "10px 12px",
    backgroundColor: "#f0f0f0",
    fontSize: "12px",
    fontWeight: "bold" as const,
    borderBottom: "1px solid #ddd",
  },
  statsValue: {
    padding: "10px 12px",
    fontSize: "12px",
    borderBottom: "1px solid #ddd",
  },
  demographicsContainer: {
    display: "grid" as const,
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginTop: "20px",
  },
  demographicsCard: {
    background: "white",
    padding: "20px",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    textAlign: "center" as const,
    border: "1px solid #f0f0f0",
  },
  criteriaTable: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "10px",
    background: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  criteriaRow: {
    borderBottom: "1px solid #ddd",
  },
};
