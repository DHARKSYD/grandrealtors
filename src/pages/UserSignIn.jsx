import React, { useState } from "react";
import styles from "./UserAuth.module.css";

const UserSignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add authentication logic here
    // For demo, just show a toast or redirect
    // toast({ ... });
  };

  return (
    <div className={styles.authWrapper}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
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
        <button className={styles.button} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default UserSignIn;