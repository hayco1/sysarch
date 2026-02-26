import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockEvents, type Event } from "../data/mockData";

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState(mockEvents);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [currentTab, setCurrentTab] = useState<"home" | "events">("home");

  const addEvent = () => {
    if (newEventTitle.trim()) {
      const newEvent = {
        id: events.length + 1,
        title: newEventTitle,
        date: newEventDate || new Date().toISOString().split("T")[0],
        location: "Barangay 420",
      };
      setEvents([...events, newEvent]);
      setNewEventTitle("");
      setNewEventDate("");
      setShowAddForm(false);
    }
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleLogout = () => {
    navigate("/");
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

        <div style={styles.tabsContainer}>
          <button
            style={{
              ...styles.tab,
              ...(currentTab === "home" ? styles.tabActive : {}),
            }}
            onClick={() => setCurrentTab("home")}
          >
            HOME
          </button>
          <button
            style={{
              ...styles.tab,
              ...(currentTab === "events" ? styles.tabActive : {}),
            }}
            onClick={() => setCurrentTab("events")}
          >
            EVENTS
          </button>
          <button style={styles.tab} onClick={handleLogout}>
            LOGOUT
          </button>
        </div>

        <div style={styles.actionButtonsContainer}>
          <button style={styles.deleteButton} onClick={() => alert("Delete selected events")}>
            DELETE
          </button>
          <button style={styles.addButton} onClick={() => setShowAddForm(!showAddForm)}>
            ADD
          </button>
        </div>

        {showAddForm && (
          <div style={styles.addFormContainer}>
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              style={styles.input}
            />
            <input
              type="date"
              value={newEventDate}
              onChange={(e) => setNewEventDate(e.target.value)}
              style={styles.input}
            />
            <button onClick={addEvent} style={styles.submitButton}>
              ADD EVENT
            </button>
          </div>
        )}

        <div style={styles.contentArea}>
          <h2 style={styles.title}>Barangay 420 Events</h2>
          <div style={styles.eventsGrid}>
            {events.map((event: Event) => (
              <div key={event.id} style={styles.eventCard}>
                <img
                  src={`https://via.placeholder.com/220x150?text=${encodeURIComponent(event.title)}`}
                  alt={event.title}
                  style={styles.eventImage}
                />
                <div style={styles.eventCardContent}>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <p style={styles.eventDate}>{event.date}</p>
                  <div style={styles.eventCardActions}>
                    <button
                      style={styles.deleteIcon}
                      onClick={() => deleteEvent(event.id)}
                      title="Delete event"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
  actionButtonsContainer: {
    display: "flex" as const,
    gap: "8px",
    padding: "12px 24px",
    background: "#f5f5f5",
  },
  deleteButton: {
    padding: "8px 16px",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold" as const,
  },
  addButton: {
    padding: "8px 16px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold" as const,
  },
  addFormContainer: {
    background: "white",
    padding: "16px 24px",
    borderBottom: "2px solid #ff6b35",
    display: "flex" as const,
    gap: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "2px",
    fontSize: "12px",
    flex: 1,
  },
  submitButton: {
    padding: "8px 16px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold" as const,
  },
  contentArea: {
    flex: 1,
    padding: "32px 40px",
    overflowY: "auto" as const,
    background: "linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold" as const,
    marginBottom: "24px",
    color: "#333",
  },
  eventsGrid: {
    display: "grid" as const,
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
    background: "linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)",
  },
  eventCard: {
    background: "white",
    borderRadius: "4px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  eventImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover" as const,
  },
  eventCardContent: {
    padding: "12px",
  },
  eventTitle: {
    margin: "0 0 4px 0",
    fontSize: "13px",
    fontWeight: "bold" as const,
    color: "#333",
  },
  eventDate: {
    margin: "0",
    fontSize: "11px",
    color: "#999",
  },
  eventCardActions: {
    display: "flex" as const,
    gap: "4px",
    marginTop: "8px",
  },
  deleteIcon: {
    padding: "4px 8px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
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
