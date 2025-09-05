import React, { useState } from 'react';
import styles from './SellPage.module.css';
import { motion } from 'framer-motion';
import {
  Tag,
  UploadCloud,
  CheckCircle,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SellPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    price: '',
    description: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: '🚧 Feature Coming Soon!',
      description:
        "Property submission is still in development! 🚀",
    });
  };

  const benefits = [
    'Reach thousands of potential buyers in Nigeria.',
    'User-friendly platform to list your property.',
    'Expert support and guidance through the selling process.',
    'Competitive listing fees.',
  ];

  const tips = [
    'Provide clear, high-quality photos of your property.',
    'Set a competitive and realistic asking price.',
    'Be detailed and honest in your property description.',
    'Ensure your property is clean and presentable for viewings.',
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.titleSection}
        >
          <Tag className={styles.iconLarge} />
          <h1 className={styles.title}>Sell Your Property with GrandRealtors</h1>
          <p className={styles.subtitle}>
            List your Nigerian property with us and connect with serious buyers quickly and efficiently.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.formCard}
          >
            <h2 className={styles.formTitle}>Property Information Form</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="propertyType" className={styles.label}>Property Type</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  className={styles.select}
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select type...</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Terrace">Terrace House</option>
                  <option value="Town House">Town House</option>
                  <option value="Detached">Detached</option>
                  <option value="Semi-Detched">Semi-Detched</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Mansion">Masion</option>
                  <option value="Studio">Studio</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="location" className={styles.label}>Location (e.g., Lekki Phase 1, Lagos)</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className={styles.input}
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="price" className={styles.label}>Asking Price (₦)</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className={styles.input}
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>Brief Description</label>
                <textarea
                  name="description"
                  id="description"
                  className={styles.textarea}
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <hr style={{ margin: "1.5rem 0" }} />

              <div className={styles.sectionTitle}>Your Contact Information</div>
              <div className={styles.formGroup}>
                <label htmlFor="contactName" className={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="contactName"
                  id="contactName"
                  className={styles.input}
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contactPhone" className={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="contactPhone"
                  id="contactPhone"
                  className={styles.input}
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contactEmail" className={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="contactEmail"
                  id="contactEmail"
                  className={styles.input}
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Button type="submit" className={styles.submitButton}>
                <UploadCloud style={{ marginRight: 8 }} />
                Submit Your Property
              </Button>
            </form>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.infoSection}
          >
            <div className={styles.benefitsCard}>
              <h2 className={styles.sectionTitle}>Why Sell With Us?</h2>
              <ul>
                {benefits.map((benefit, index) => (
                  <li key={index} className={styles.benefitItem}>
                    <CheckCircle className={styles.benefitItemIcon} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.tipsCard}>
              <div className={styles.tipHeader}>
                <Info className={styles.tipItemIcon} />
                Tips for a Successful Sale
              </div>
              <ul className={styles.tipText}>
                {tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
