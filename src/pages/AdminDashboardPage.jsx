import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Home, DollarSign, Phone, PlusCircle, BarChart3, Users, Settings, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { usePropertyContext } from '@/context/PropertyContext';
import styles from './AdminDashboardPage.module.css';

const AdminDashboardPage = () => {
  const { toast } = useToast();
  const { properties, setProperties } = usePropertyContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    type: '',
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newProperty = {
      ...form,
      id: Date.now(),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      sqft: Number(form.sqft),
      featured: Boolean(form.featured),
      price: form.price.startsWith("₦") ? form.price : `₦${form.price}`,
    };
    setProperties(prev => [newProperty, ...prev]);
    setShowAddPropertyForm(false); // Close modal after adding
    setForm({
      title: '',
      location: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      sqft: '',
      type: '',
      featured: false,
      description: '',
      image: '',
      latitude: '',
      longitude: '',
    });
  };

  const handleDelete = (id) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  const AdminCard = ({ title, value, icon, action, isLoading }) => {
    const IconComponent = icon;
    return (
      <motion.div 
        className={styles.card}
        whileHover={{ y: -5 }}
      >
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <IconComponent className={`w-8 h-8 text-blue-500 ${isLoading ? styles.spin : ''}`} />
        </div>
        {isLoading ? (
          <p className={styles.cardLoading}>Loading...</p>
        ) : (
          <p className={styles.cardValue}>{value}</p>
        )}
        {action && <Button onClick={action.onClick} size="sm" className="w-full" disabled={isLoading}>{action.label}</Button>}
      </motion.div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className={styles.grid3}>
            <AdminCard title="Total Properties" value="--" icon={Home} isLoading={false} action={{label: "Refresh Listings", onClick: () => toast({ title: "Refreshing listings..." })}} />
            <AdminCard title="Total Sales Value (Est.)" value="₦15.5B" icon={DollarSign} action={{label: "View Sales Reports", onClick: () => toast({ title: "🚧 Under Development" })}} />
            <AdminCard title="Leads/Calls (Month)" value="128" icon={Phone} action={{label: "Manage Leads", onClick: () => toast({ title: "🚧 Under Development" })}} />
          </div>
        );
      case 'listings':
        return (
          <div className={styles.listingsWrapper}>
            <div className={styles.listingsHeader}>
              <h2 className={styles.listingsTitle}>Manage Listings</h2>
              <div className={styles.actionsGroup}>
                <Button onClick={() => toast({ title: 'Refreshed!' })} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                </Button>
                <Button onClick={() => setShowAddPropertyForm(true)} className={styles.addBtn}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Property
                </Button>
              </div>
            </div>
            {properties.length === 0 ? (
              <p>No property data connected.</p>
            ) : (
              <ul className={styles.listingList}>
                {properties.map((p) => (
                  <li key={p.id} className={styles.listingItem}>
                    <div>
                      <div className={styles.listingTitle}>{p.title}</div>
                      <div className={styles.listingSubtitle}>
                        {p.location} {p.price && <>- <span>{p.price}</span></>}
                      </div>
                    </div>
                    <div className={styles.listingActions}>
                      <Button variant="outline" size="sm" className={styles.editBtn}>Edit</Button>
                      <Button variant="destructive" size="sm" className={styles.deleteBtn} onClick={() => handleDelete(p.id)}>Delete</Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {showAddPropertyForm && (
              <div className={styles.addFormWrapper}>
                <form onSubmit={handleAdd} className={styles.addFormModal}>
                  <div className={styles.addFormTitle}>
                    Add New Property
                    <button
                      type="button"
                      onClick={() => setShowAddPropertyForm(false)}
                      style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                    >
                      &times;
                    </button>
                  </div>
                  <div className={styles.addFormGrid}>
                    <div className={styles.formGroup}>
                      <label>Title</label>
                      <input name="title" value={form.title} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Location</label>
                      <input name="location" value={form.location} onChange={handleChange} required />
                    </div>
                    <div className={`${styles.formGroup} ${styles.addFormGridFull}`}>
                      <label>Price (Numeric value, e.g., 150000000)</label>
                      <input name="price" value={form.price} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Bedrooms</label>
                      <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Bathrooms</label>
                      <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} required />
                    </div>
                    <div className={`${styles.formGroup} ${styles.addFormGridFull}`}>
                      <label>Square Feet/Meters (e.g. 500 sqm)</label>
                      <input name="sqft" type="number" value={form.sqft} onChange={handleChange} required />
                    </div>
                    <div className={`${styles.formGroup} ${styles.addFormGridFull}`}>
                      <label>Property Type</label>
                      <select name="type" value={form.type} onChange={handleChange} required>
                        <option value="">Select Type</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Bungalow">Bungalow</option>
                        <option value="Terrace">Terrace</option>
                        <option value="Semi-Detached">Semi-Detached</option>
                        <option value="Detached">Detached</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Studio">Studio</option>
                        <option value="Flat">Flat</option>
                        <option value="Mansion">Mansion</option>
                      </select>
                    </div>
                    <div className={`${styles.formGroup} ${styles.addFormGridFull}`}>
                      <label>Description</label>
                      <textarea name="description" value={form.description || ''} onChange={handleChange} />
                    </div>
                    <div className={`${styles.formGroup} ${styles.addFormGridFull}`}>
                      <label>Image URL (Optional)</label>
                      <input name="image" value={form.image || ''} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Latitude (Optional)</label>
                      <input name="latitude" value={form.latitude || ''} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Longitude (Optional)</label>
                      <input name="longitude" value={form.longitude || ''} onChange={handleChange} />
                    </div>
                    <div className={`${styles.formGroup} ${styles.addFormGridFull}`}>
                      <div className={styles.checkboxGroup}>
                        <input
                          name="featured"
                          type="checkbox"
                          checked={form.featured}
                          onChange={handleChange}
                          id="featured"
                        />
                        <label htmlFor="featured">Mark as Featured</label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      onClick={() => setShowAddPropertyForm(false)}
                      className={styles['btn-secondary']}
                    >
                      Cancel
                    </button>
                    <button type="submit" className={styles['btn-primary']}>
                      Add Property
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        );
      default:
        return <p className="text-gray-600">Select a tab to view content.</p>;
    }
  };

  const tabs = [
    { name: 'Overview', icon: LayoutDashboard, id: 'overview' },
    { name: 'Listings', icon: Home, id: 'listings' },
    { name: 'Analytics', icon: BarChart3, id: 'analytics' },
    { name: 'Users', icon: Users, id: 'users' },
    { name: 'Settings', icon: Settings, id: 'settings' },
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Admin Dashboard</h1>
          <p>Welcome, Admin! Manage GrandRealtors operations here.</p>
        </div>
        <div className={styles.pageContent}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`${styles.sidebarButton} ${activeTab === tab.id ? styles.sidebarButtonActive : ''}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id !== 'overview' && tab.id !== 'listings') {
                      toast({ title: `🚧 ${tab.name} under development!` });
                    }
                  }}
                >
                  <Icon className={styles.tabIcon} />
                  {tab.name}
                </Button>
              );
            })}
          </aside>
          {/* Main Content */}
          <main className={styles.mainContent}>
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
