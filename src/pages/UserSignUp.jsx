import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import styles from "./UserAuth.module.css";

const UserSignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    sex: "",
    occupation: "",
    password: "",
    confirmPassword: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (
      !form.firstName ||
      !form.lastName ||
      !form.occupation ||
      !form.email
    ) {
      setError("Please fill in all fields.");
      return;
    }
    // Save user to localStorage
    localStorage.setItem(
      "grandRealtors_user",
      JSON.stringify({ ...form, profilePic })
    );
    toast({
      title: "Sign up successful!",
      description: "Welcome to GrandRealtors.",
    });
    navigate("/profile");
  };

  return (
    <div className={styles.authWrapper}>
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit} className={styles.formCustom}>
        
        <div className={styles.flexRow}>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input2}
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <select
          className={styles.input}
          name="sex"
          value={form.sex}
          onChange={handleChange}
          required
        >
          <option value="">Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

<div className={styles.profilePicWrapper}>
          <label htmlFor="profilePicInput" className={styles.profilePicLabel}>
            <div className={styles.profilePicPreview}>
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  className={styles.profilePicImg}
                />
              ) : (
                <span className={styles.profilePicPlaceholder}>+</span>
              )}
            </div>
            <input
              id="profilePicInput"
              type="file"
              accept="image/*"
              onChange={handlePicChange}
              style={{ display: "none" }}
            />
            <span className={styles.profilePicText}>Add Profile Picture</span>
          </label>
        </div>

        <input
          className={styles.input}
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={form.occupation}
          onChange={handleChange}
          required
        />
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
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        {error && (
          <div style={{ color: "red", fontSize: "0.95rem", marginBottom: 8 }}>
            {error}
          </div>
        )}
        <button className={styles.button} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default UserSignUp;