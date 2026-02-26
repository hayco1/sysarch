import { Link } from "react-router-dom";
import { mockEvents, type Event } from "../data/mockData";

export default function Events() {
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h1 style={styles.navTitle}>Barangay 420 - Barangay Events</h1>
        <div>
          <Link to="/resident" style={styles.navLink}>
            Home
          </Link>
          {" | "}
          <Link to="/events" style={styles.navLink}>
            Barangay Events
          </Link>
          {" | "}
          <Link to="/" style={styles.navLink}>
            Logout
          </Link>
        </div>
      </nav>

      <div style={styles.content}>
        <h2 style={styles.pageTitle}>Upcoming Barangay Events</h2>
        <p style={{color: '#666', marginBottom: 12}}>Browse scheduled community activities and register to participate.</p>

        <div style={styles.eventsContainer}>
          {mockEvents.map((event: Event) => (
            <div key={event.id} style={styles.eventCard}>
              <h3 style={styles.eventTitle}>{event.title}</h3>
              <p style={styles.eventMeta}>
                <strong>📅 Date:</strong> {event.date}
              </p>
              <p style={styles.eventMeta}>
                <strong>📍 Location:</strong> {event.location}
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
    background: "#f5f5f5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  navbar: {
    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    color: "white",
    padding: "20px 40px",
    display: "flex" as const,
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  navTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold" as const,
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 15px",
    fontSize: "15px",
    fontWeight: "500" as const,
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
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    borderTop: "4px solid #1e3c72",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    color: "#333",
  },
  eventTitle: {
    color: "#1e3c72",
    marginBottom: "8px",
    fontSize: "20px",
  },
  eventMeta: {
    color: "#444",
    marginBottom: "8px",
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
    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
    fontSize: "15px",
    fontWeight: "bold" as const,
    width: "100%",
  },
};
