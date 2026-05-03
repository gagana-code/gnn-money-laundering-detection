import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true); setError("");
    try {
      await signup(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
    } finally { setLoading(false); }
  };

  const s = {
    page: { minHeight: "100vh", background: "#0a0e17", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Mono', monospace" },
    card: { background: "#0d1220", border: "1px solid #1e2d4a", borderRadius: 8, padding: "40px 36px", width: "100%", maxWidth: 400 },
    label: { display: "block", fontSize: 11, color: "#64748b", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" },
    input: { width: "100%", padding: "10px 12px", background: "#0a0e17", border: "1px solid #1e2d4a", borderRadius: 4, color: "#e2e8f0", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" },
    btn: { width: "100%", padding: "12px", background: "#1d4ed8", border: "none", borderRadius: 4, color: "white", fontSize: 13, fontFamily: "inherit", cursor: "pointer", letterSpacing: "0.1em", marginTop: 8 },
    error: { background: "#450a0a", border: "1px solid #7f1d1d", borderRadius: 4, padding: "10px 12px", color: "#fca5a5", fontSize: 12, marginBottom: 16 },
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 36, color: "#3b82f6" }}>◈</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.15em" }}>CREATE ACCOUNT</div>
          <div style={{ fontSize: 11, color: "#4b5e7a", marginTop: 4 }}>AML SHIELD PLATFORM</div>
        </div>
        {error && <div style={s.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {[["Name", "name", "text", "John Analyst"], ["Email", "email", "email", "analyst@bank.com"], ["Password", "password", "password", "••••••••"], ["Confirm Password", "confirm", "password", "••••••••"]].map(([label, key, type, ph]) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <label style={s.label}>{label}</label>
              <input style={s.input} type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required placeholder={ph} />
            </div>
          ))}
          <button style={s.btn} disabled={loading}>{loading ? "CREATING..." : "CREATE ACCOUNT →"}</button>
        </form>
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#4b5e7a" }}>
          Already have an account? <Link to="/login" style={{ color: "#3b82f6", textDecoration: "none" }}>Login</Link>
        </div>
      </div>
    </div>
  );
}
