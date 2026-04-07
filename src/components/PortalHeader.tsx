import type { ReactNode } from "react";

type PortalHeaderProps = {
  rightLabel?: string;
  actions?: ReactNode;
};

export default function PortalHeader({ rightLabel = "Barangay Portal", actions }: PortalHeaderProps) {
  return (
    <div style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.brandBlock}>
          <div style={styles.logoFrame}>
            <img src="/assets/manila-seal.png" alt="City of Manila seal" style={styles.logo} />
          </div>
          <div>
            <p style={styles.sideLabel}>Barangay 420</p>
            <p style={styles.sideSubLabel}>City of Manila</p>
          </div>
        </div>

        <div style={styles.headerText}>
          <p style={styles.headerSmall}>Republic of the Philippines</p>
          <p style={styles.headerSmall}>City of Manila</p>
          <p style={styles.headerTitle}>BARANGAY 420 ZONE 43, DISTRICT IV</p>
          <p style={styles.headerSubtitle}>SAMPALOC, MANILA</p>
          <p style={styles.headerRed}>OFFICE OF THE BARANGAY CHAIRMAN</p>
        </div>

        <div style={styles.brandBlockRight}>
          <div style={styles.logoFrame}>
            <img src="/assets/manila-seal.png" alt="City of Manila seal" style={styles.logo} />
          </div>
          <div style={styles.rightText}>
            <p style={styles.sideLabel}>{rightLabel}</p>
            {actions ? <div style={styles.actions}>{actions}</div> : <p style={styles.sideSubLabel}>Community Records Portal</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,250,253,0.96) 100%)",
    padding: "24px 28px",
    borderBottom: "3px solid #f08b63",
    boxShadow: "0 12px 28px rgba(61, 95, 128, 0.1)",
  },
  headerContent: {
    display: "flex" as const,
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap" as const,
  },
  brandBlock: {
    display: "flex" as const,
    alignItems: "center",
    gap: "12px",
    minWidth: "190px",
  },
  brandBlockRight: {
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "12px",
    minWidth: "220px",
    marginLeft: "auto",
  },
  logoFrame: {
    width: "62px",
    height: "62px",
    borderRadius: "50%",
    background: "linear-gradient(180deg, #ffffff 0%, #ecf4fa 100%)",
    boxShadow: "0 8px 18px rgba(61, 95, 128, 0.14)",
    border: "1px solid rgba(145, 180, 210, 0.3)",
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  logo: {
    width: "48px",
    height: "48px",
    objectFit: "contain" as const,
  },
  headerText: {
    textAlign: "center" as const,
    flex: 1,
    minWidth: "280px",
  },
  headerSmall: {
    margin: "2px 0",
    fontSize: "11px",
    color: "#31485d",
  },
  headerTitle: {
    margin: "6px 0",
    fontSize: "19px",
    fontWeight: "bold" as const,
    color: "#243b53",
    letterSpacing: "0.02em",
  },
  headerSubtitle: {
    margin: "2px 0",
    fontSize: "12px",
    color: "#31485d",
  },
  headerRed: {
    margin: "8px 0 0",
    fontSize: "14px",
    fontWeight: "bold" as const,
    color: "#bf4d2d",
  },
  sideLabel: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "bold" as const,
    color: "#275173",
  },
  sideSubLabel: {
    margin: "2px 0 0",
    fontSize: "12px",
    color: "#607489",
  },
  rightText: {
    textAlign: "right" as const,
  },
  actions: {
    display: "flex" as const,
    gap: "8px",
    justifyContent: "flex-end",
    flexWrap: "wrap" as const,
    marginTop: "6px",
  },
} as const;
