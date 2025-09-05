import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserAuth.module.css';

const AdminSignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: Accept any credentials, store in localStorage
    localStorage.setItem('admin', JSON.stringify({ email: form.email }));
    navigate('/admin-dashboard');
  };

  return (
    <div className={styles.authWrapper}>
      <h2>Admin Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <a href="/admin-signup">Sign Up</a></p>
    </div>
  );
};

export default AdminSignIn;