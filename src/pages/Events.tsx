import { Link } from "react-router-dom";
import { mockEvents, type Event } from "../data/mockData";
import PortalHeader from "../components/PortalHeader";

export default function Events() {
  return (
    <div style={styles.container}>
      <PortalHeader
        rightLabel="Events"
        actions={
          <>
            <Link to="/resident" style={styles.headerAction}>Home</Link>
            <Link to="/events" style={styles.headerAction}>Events</Link>
            <Link to="/login" style={styles.headerAction}>Logout</Link>
          </>
        }
      />

      <div style={styles.content}>
        <h2 style={styles.pageTitle}>Upcoming Barangay Events</h2>
        <p style={{ color: "#666", marginBottom: 12 }}>Browse scheduled community activities and register to participate.</p>

        <div style={styles.eventsContainer}>
          {mockEvents.map((event: Event) => (
            <div key={event.id} style={styles.eventCard}>
              <img src={event.imageUrl} alt={event.title} style={styles.eventImage} />
              <h3 style={styles.eventTitle}>{event.title}</h3>
              <p style={styles.eventMeta}>
                <strong>Date:</strong> {event.date}
              </p>
              <p style={styles.eventMeta}>
                <strong>Location:</strong> {event.location}
              </p>
              <button style={styles.button}>Register / Learn More</button>
            </div>
          ))}
        </div>
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
    flex: 1,
    overflowY: "auto" as const,
  },
  eventsContainer: {
    display: "grid" as const,
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    marginTop: "30px",
  },
  eventCard: {
    background: "rgba(255,255,255,0.96)",
    padding: "0 0 25px",
    borderRadius: "12px",
    borderTop: "4px solid #1e3c72",
    boxShadow: "0 18px 36px rgba(58, 95, 130, 0.12)",
    border: "1px solid rgba(145, 180, 210, 0.24)",
    color: "#333",
    overflow: "hidden" as const,
  },
  eventImage: {
    width: "100%",
    height: "190px",
    objectFit: "cover" as const,
    display: "block" as const,
  },
  eventTitle: {
    color: "#275173",
    margin: "18px 25px 8px",
    fontSize: "20px",
  },
  eventMeta: {
    color: "#444",
    margin: "0 25px 8px",
    fontSize: "15px",
  },
  pageTitle: {
    color: "#1e3c72",
    fontSize: "32px",
    marginBottom: "30px",
    fontWeight: "bold" as const,
  },
  button: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #4d9fda 0%, #2f7fbe 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    margin: "15px 25px 0",
    fontSize: "15px",
    fontWeight: "bold" as const,
    width: "calc(100% - 50px)",
    boxShadow: "0 10px 18px rgba(47, 127, 190, 0.18)",
  },
};
