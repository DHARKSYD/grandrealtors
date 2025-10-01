import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import styles from "./UserAuth.module.css";

const UserSignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const user = JSON.parse(localStorage.getItem("grandRealtors_user"));

    if (!user) {
      setError("No account found. Please sign up first.");
      toast({
        title: "Sign in failed",
        description: "No account found. Please sign up first.",
        variant: "destructive",
      });
      return;
    }

    if (user.email === form.email && user.password === form.password) {
      toast({
        title: "Sign in successful!",
        description: `Welcome back, ${user.firstName}!`,
      });
      navigate("/profile");
    } else {
      setError("Invalid email or password.");
      toast({
        title: "Sign in failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={styles.authWrapper}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.formCustom}>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && (
          <div style={{ color: "red", fontSize: "0.95rem", marginBottom: 8 }}>
            {error}
          </div>
        )}
        <button className={styles.button} type="submit">
          Sign In
        </button>
      </form>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <p>
          Don’t have an account?{" "}
          <Link to="/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignIn;
