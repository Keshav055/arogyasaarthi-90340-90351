import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/auth";

/**
 * PUBLIC_INTERFACE
 * SignupPage handles registration.
 */
function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
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
    const result = await signup(form.email, form.password);
    setLoading(false);
    if (result.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError(result.message || "Signup failed.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: "4rem auto" }}>
      <h2>Sign Up</h2>
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
          autoComplete="new-password"
          required
          value={form.password}
          onChange={onChange}
          style={{ width: "100%", marginBottom: 12 }}
        />
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        <button className="btn btn-large" disabled={loading} type="submit" style={{ width: "100%" }}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div style={{ marginTop: 16 }}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default SignupPage;
