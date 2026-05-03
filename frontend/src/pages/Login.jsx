import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally { setLoading(false); }
  };

  const styles = {
    page: { minHeight: "100vh", background: "#0a0e17", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Mono', monospace" },
    card: { background: "#0d1220", border: "1px solid #1e2d4a", borderRadius: 8, padding: "40px 36px", width: "100%", maxWidth: 400 },
    logo: { textAlign: "center", marginBottom: 32 },
    logoIcon: { fontSize: 40, color: "#3b82f6" },
    logoText: { fontSize: 20, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.15em" },
    logoSub: { fontSize: 11, color: "#4b5e7a", marginTop: 4, letterSpacing: "0.2em" },
    label: { display: "block", fontSize: 11, color: "#64748b", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" },
    input: { width: "100%", padding: "10px 12px", background: "#0a0e17", border: "1px solid #1e2d4a", borderRadius: 4, color: "#e2e8f0", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" },
    btn: { width: "100%", padding: "12px", background: "#1d4ed8", border: "none", borderRadius: 4, color: "white", fontSize: 13, fontFamily: "inherit", cursor: "pointer", letterSpacing: "0.1em", marginTop: 8 },
    error: { background: "#450a0a", border: "1px solid #7f1d1d", borderRadius: 4, padding: "10px 12px", color: "#fca5a5", fontSize: 12, marginBottom: 16 },
    link: { color: "#3b82f6", textDecoration: "none" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>◈</div>
          <div style={styles.logoText}>AML SHIELD</div>
          <div style={styles.logoSub}>ANTI-MONEY LAUNDERING PLATFORM</div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="analyst@bank.com" />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button style={styles.btn} disabled={loading}>
            {loading ? "AUTHENTICATING..." : "LOGIN →"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#4b5e7a" }}>
          No account? <Link to="/signup" style={styles.link}>Create one</Link>
        </div>
      </div>
    </div>
  );
}
