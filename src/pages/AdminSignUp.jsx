import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserAuth.module.css';

const AdminSignUp = () => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: Accept any credentials, store in localStorage
    localStorage.setItem('admin', JSON.stringify({ email: form.email, name: form.name }));
    navigate('/admin-dashboard');
  };

  return (
    <div className={styles.authWrapper}>
      <h2>Admin Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/admin-signin">Sign In</a></p>
    </div>
  );
};

export default AdminSignUp;