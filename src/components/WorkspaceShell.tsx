import { useState, type ReactNode } from "react";
import PortalHeader from "./PortalHeader";

type NavItem = {
  key: string;
  label: string;
  caption?: string;
  badge?: string;
};

type WorkspaceShellProps = {
  rightLabel: string;
  title: string;
  subtitle: string;
  navItems: NavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  actions?: ReactNode;
  hero?: ReactNode;
  children: ReactNode;
};

export default function WorkspaceShell({
  rightLabel,
  title,
  subtitle,
  navItems,
  activeKey,
  onSelect,
  actions,
  hero,
  children,
}: WorkspaceShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        ...styles.page,
        gridTemplateColumns: collapsed ? "92px minmax(0, 1fr)" : "280px minmax(0, 1fr)",
      }}
    >
      <aside style={{ ...styles.sidebar, ...(collapsed ? styles.sidebarCollapsed : {}) }}>
        <div style={styles.sidebarTop}>
          <button
            type="button"
            onClick={() => setCollapsed((current) => !current)}
            style={styles.toggleButton}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? ">>" : "<<"}
          </button>
        </div>

        <div style={{ ...styles.brandCard, ...(collapsed ? styles.brandCardCollapsed : {}) }}>
          <div style={styles.brandEyebrow}>Barangay 420</div>
          {!collapsed ? <h1 style={styles.brandTitle}>{title}</h1> : null}
          {!collapsed ? <p style={styles.brandSubtitle}>{subtitle}</p> : null}
        </div>

        <nav style={styles.nav}>
          {navItems.map((item) => {
            const active = item.key === activeKey;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onSelect(item.key)}
                style={{
                  ...styles.navButton,
                  ...(collapsed ? styles.navButtonCollapsed : {}),
                  ...(active ? styles.navButtonActive : {}),
                }}
              >
                <span style={styles.navLabelRow}>
                  <span>{collapsed ? item.label.slice(0, 1) : item.label}</span>
                  {!collapsed && item.badge ? <span style={styles.badge}>{item.badge}</span> : null}
                </span>
                {!collapsed && item.caption ? <span style={styles.navCaption}>{item.caption}</span> : null}
              </button>
            );
          })}
        </nav>
      </aside>

      <main style={styles.main}>
        <PortalHeader rightLabel={rightLabel} actions={actions} />
        {hero ? <div style={styles.hero}>{hero}</div> : null}
        <div style={styles.content}>{children}</div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "280px minmax(0, 1fr)",
    background: "linear-gradient(135deg, #f4efe6 0%, #edf5fb 40%, #e6eef6 100%)",
    color: "#1f3347",
  },
  sidebar: {
    padding: "28px 20px",
    background: "linear-gradient(180deg, #18314f 0%, #23486c 52%, #2f6c8f 100%)",
    color: "#f5f9ff",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 20,
    boxShadow: "18px 0 38px rgba(21, 37, 53, 0.14)",
  },
  sidebarCollapsed: {
    padding: "20px 12px",
  },
  sidebarTop: {
    display: "flex" as const,
    justifyContent: "flex-end",
  },
  toggleButton: {
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.08)",
    color: "#f5f9ff",
    borderRadius: 12,
    padding: "8px 10px",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: 12,
  },
  brandCard: {
    padding: "22px 18px",
    borderRadius: 22,
    background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.08) 100%)",
    border: "1px solid rgba(255,255,255,0.18)",
  },
  brandCardCollapsed: {
    padding: "16px 10px",
    textAlign: "center" as const,
  },
  brandEyebrow: {
    fontSize: 12,
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    opacity: 0.76,
    marginBottom: 10,
  },
  brandTitle: {
    margin: "0 0 10px",
    fontSize: 24,
    lineHeight: 1.15,
  },
  brandSubtitle: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.6,
    color: "rgba(245,249,255,0.84)",
  },
  nav: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 10,
  },
  navButton: {
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#f5f9ff",
    borderRadius: 18,
    padding: "14px 16px",
    textAlign: "left" as const,
    cursor: "pointer",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 6,
  },
  navButtonCollapsed: {
    padding: "14px 10px",
    alignItems: "center" as const,
    textAlign: "center" as const,
  },
  navButtonActive: {
    background: "linear-gradient(135deg, #f3b36f 0%, #ef8f5c 100%)",
    color: "#182a3d",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 16px 28px rgba(16, 26, 37, 0.24)",
  },
  navLabelRow: {
    display: "flex" as const,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    fontWeight: 700,
    fontSize: 14,
  },
  navCaption: {
    fontSize: 12,
    lineHeight: 1.4,
    opacity: 0.8,
  },
  badge: {
    minWidth: 26,
    padding: "4px 8px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.72)",
    textAlign: "center" as const,
    fontSize: 11,
    fontWeight: 800,
  },
  main: {
    display: "flex" as const,
    flexDirection: "column" as const,
    minWidth: 0,
  },
  hero: {
    padding: "24px 28px 0",
  },
  content: {
    padding: 28,
    display: "grid",
    gap: 24,
  },
} as const;
