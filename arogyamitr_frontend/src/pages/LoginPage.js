import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/auth";

/**
 * PUBLIC_INTERFACE
 * LoginPage shows login form and OAuth options.
 */
function LoginPage() {
  const { login, loginWithOAuthProvider } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateEmail(form.email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }
    if (!validatePassword(form.password)) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      // Go to where the user tried to go or default to dashboard
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } else {
      setError(result.message || "Login failed.");
    }
  };

  const handleOAuth = async (provider) => {
    setLoading(true);
    await loginWithOAuthProvider(provider);
    setLoading(false);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: "4rem auto" }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          autoComplete="username"
          required
          value={form.email}
          onChange={onChange}
          style={{ width: "100%", marginBottom: 12 }}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={form.password}
          onChange={onChange}
          style={{ width: "100%", marginBottom: 12 }}
        />
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        <button className="btn btn-large" disabled={loading} type="submit" style={{ width: "100%" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <hr style={{ margin: "2rem 0" }} />
      <div style={{ marginBottom: 8 }}>Or sign in with:</div>
      <button className="btn" style={{ width: "100%", marginBottom: 8, background: "#EA4335" }}
        disabled={loading}
        onClick={() => handleOAuth("google")}
      >Google (stub)</button>
      <button className="btn" style={{ width: "100%", marginBottom: 18, background: "#111" }}
        disabled={loading}
        onClick={() => handleOAuth("apple")}
      >Apple (stub)</button>
      <div>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
