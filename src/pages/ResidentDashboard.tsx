import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { mockEvents, type Event } from "../data/mockData";

export default function ResidentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState<"events" | "census">("events");

  const handleLogout = () => {
    navigate("/");
  };

  const currentEvent = mockEvents[0];

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
          <button
            style={{
              ...styles.tab,
              ...(currentTab === "events" ? styles.tabActive : {}),
            }}
            onClick={() => setCurrentTab("events")}
          >
            HOME
          </button>
          <button
            style={{
              ...styles.tab,
              ...(currentTab === "census" ? styles.tabActive : {}),
            }}
            onClick={() => setCurrentTab("census")}
          >
            EVENTS
          </button>
          <button style={styles.tab}>INFO</button>
          <button style={styles.tab} onClick={handleLogout}>
            LOGOUT
          </button>
        </div>

        <div style={styles.contentArea}>
          {currentTab === "events" && (
            <div>
              <div style={styles.eventDetailSection}>
                <h2 style={styles.eventTitle}>{currentEvent?.title || "Basketball League"}</h2>
                <img
                  src="https://via.placeholder.com/400x250?text=Event+Image"
                  alt="Event"
                  style={styles.eventImage}
                />
                <p style={styles.eventDate}>
                  {currentEvent?.date
                    ? new Date(currentEvent.date).toLocaleDateString()
                    : "Dec 21, 2024"}
                </p>
                <p style={styles.eventDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p style={styles.hashtag}>#tagy_link_day</p>
              </div>
            </div>
          )}

          {currentTab === "census" && (
            <div style={styles.censuForm}>
              <h2 style={styles.formTitle}>Census Form</h2>
              <div style={styles.formSection}>
                <h3>Personal Information</h3>
                <input type="text" placeholder="Household" style={styles.fullInput} />
                <input type="text" placeholder="Address" style={styles.fullInput} />
                <input type="text" placeholder="No. of Members" style={styles.fullInput} />
              </div>
            </div>
          )}
        </div>

        <div style={styles.footer}>
          <div style={styles.footerContent}>
            <div>
              <p style={styles.footerTitle}>Contact Us</p>
              <p style={styles.footerText}>📞 Some phone area of staff</p>
              <p style={styles.footerText}>📞 Some phone area of staff</p>
              <p style={styles.footerText}>📧 Some email area of staff</p>
            </div>
            <div>
              <p style={styles.footerTitle}>More Information</p>
              <p style={styles.footerText}>ℹ️ Click here area of staff</p>
              <p style={styles.footerText}>🔗 Click here area of staff</p>
              <p style={styles.footerText}>ℹ️ Click here area of staff</p>
            </div>
            <div>
              <p style={styles.footerTitle}>More Information</p>
              <p style={styles.footerText}>ℹ️ Click here area of staff</p>
              <p style={styles.footerText}>🔗 Click here area of staff</p>
              <p style={styles.footerText}>ℹ️ Click here area of staff</p>
            </div>
            <div>
              <p style={styles.footerTitle}>Social Media</p>
              <p style={styles.footerText}>📱 @social media contact</p>
              <p style={styles.footerText}>📱 @social media contact</p>
              <p style={styles.footerText}>📱 @social media contact</p>
            </div>
          </div>
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
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  tab: {
    padding: "8px 16px",
    backgroundColor: "#ff9966",
    color: "white",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold" as const,
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
  eventDetailSection: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  eventTitle: {
    fontSize: "24px",
    fontWeight: "bold" as const,
    marginBottom: "16px",
    color: "#333",
  },
  eventImage: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover" as const,
    borderRadius: "4px",
    marginBottom: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  eventDate: {
    fontSize: "12px",
    color: "#999",
    marginBottom: "16px",
  },
  eventDescription: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#666",
    marginBottom: "16px",
  },
  hashtag: {
    fontSize: "12px",
    color: "#666",
    fontWeight: "500" as const,
  },
  censuForm: {
    maxWidth: "700px",
    margin: "0 auto",
    background: "white",
    padding: "24px",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  formTitle: {
    fontSize: "18px",
    fontWeight: "bold" as const,
    marginBottom: "24px",
    color: "#333",
  },
  formSection: {
    marginBottom: "24px",
  },
  fullInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "2px",
    fontSize: "13px",
    boxSizing: "border-box" as const,
    background: "#f9f9f9",
  },
  footer: {
    background: "linear-gradient(to right, #1e465c 0%, #2a5a7a 100%)",
    color: "white",
    padding: "32px 40px",
    borderTop: "2px solid #ff6b35",
  },
  footerContent: {
    display: "grid" as const,
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "40px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  footerTitle: {
    fontSize: "13px",
    fontWeight: "bold" as const,
    marginBottom: "12px",
    color: "#ffffff",
  },
  footerText: {
    fontSize: "12px",
    marginBottom: "6px",
    opacity: 0.95,
  },
};
