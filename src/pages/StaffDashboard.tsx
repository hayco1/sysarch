import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockEvents, type Event } from "../data/mockData";
import PortalHeader from "../components/PortalHeader";

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
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
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
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}></div>

      <div style={styles.mainContent}>
        <PortalHeader rightLabel="Staff" />

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
                  src={event.imageUrl}
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
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
    padding: "8px 16px",
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
  actionButtonsContainer: {
    display: "flex" as const,
    gap: "8px",
    padding: "12px 24px",
    background: "#edf4fb",
  },
  deleteButton: {
    padding: "8px 16px",
    backgroundColor: "#d36256",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold" as const,
  },
  addButton: {
    padding: "8px 16px",
    backgroundColor: "#2f7fbe",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold" as const,
  },
  addFormContainer: {
    background: "rgba(255,255,255,0.94)",
    padding: "16px 24px",
    borderBottom: "2px solid #f3a17a",
    display: "flex" as const,
    gap: "8px",
    boxShadow: "0 8px 18px rgba(61, 95, 128, 0.06)",
  },
  input: {
    padding: "8px",
    border: "1px solid #c9d9e7",
    borderRadius: "8px",
    fontSize: "12px",
    flex: 1,
  },
  submitButton: {
    padding: "8px 16px",
    backgroundColor: "#2f7fbe",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold" as const,
  },
  contentArea: {
    flex: 1,
    padding: "32px 40px",
    overflowY: "auto" as const,
    background: "linear-gradient(135deg, #eef6fd 0%, #e4eef7 100%)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold" as const,
    marginBottom: "24px",
    color: "#243b53",
  },
  eventsGrid: {
    display: "grid" as const,
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
    background: "linear-gradient(135deg, #eef6fd 0%, #e4eef7 100%)",
  },
  eventCard: {
    background: "rgba(255,255,255,0.96)",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 14px 28px rgba(58, 95, 130, 0.12)",
    border: "1px solid rgba(145, 180, 210, 0.24)",
    cursor: "pointer",
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
    color: "#243b53",
  },
  eventDate: {
    margin: "0",
    fontSize: "11px",
    color: "#607489",
  },
  eventCardActions: {
    display: "flex" as const,
    gap: "4px",
    marginTop: "8px",
  },
  deleteIcon: {
    padding: "4px 8px",
    background: "transparent",
    border: "1px solid #c9d9e7",
    cursor: "pointer",
    fontSize: "12px",
    borderRadius: "6px",
    color: "#2f7fbe",
  },
};
