import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const s = {
    page: { padding: "28px 32px", fontFamily: "'IBM Plex Mono', monospace", maxWidth: 500 },
    title: { fontSize: 22, fontWeight: 700, color: "#e2e8f0", marginBottom: 24 },
    card: { background: "#0d1220", border: "1px solid #1e2d4a", borderRadius: 8, padding: 24, marginBottom: 16 },
    avatar: { width: 64, height: 64, borderRadius: "50%", background: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "white", marginBottom: 16 },
    field: { marginBottom: 14 },
    label: { fontSize: 11, color: "#4b5e7a", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.1em" },
    value: { fontSize: 14, color: "#e2e8f0" },
    btn: (variant) => ({ padding: "10px 20px", background: variant === "danger" ? "#450a0a" : "#1e2d4a", border: `1px solid ${variant === "danger" ? "#7f1d1d" : "#2e3f5a"}`, borderRadius: 4, color: variant === "danger" ? "#fca5a5" : "#e2e8f0", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }),
  };

  return (
    <div style={s.page}>
      <div style={s.title}>◉ PROFILE</div>
      <div style={s.card}>
        <div style={s.avatar}>{user?.name?.[0]?.toUpperCase() || "U"}</div>
        {[["Name", user?.name], ["Email", user?.email], ["Role", "AML Analyst"], ["Account ID", `USR-${user?.id}`]].map(([label, val]) => (
          <div key={label} style={s.field}>
            <div style={s.label}>{label}</div>
            <div style={s.value}>{val}</div>
          </div>
        ))}
      </div>

      <div style={s.card}>
        <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>ACCOUNT ACTIONS</div>
        <button style={s.btn("danger")} onClick={() => { logout(); navigate("/login"); }}>⏻ Logout</button>
      </div>
    </div>
  );
}
