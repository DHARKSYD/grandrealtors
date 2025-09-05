import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/Slider';
import styles from './PropertyFilters.module.css';

const PropertyFilters = ({ filters, onFiltersChange }) => {
  const propertyTypes = [
    { value: '', label: 'Any Type' },
    { value: 'Duplex', label: 'Duplex' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Masion', label: 'Masion'},
    { value: 'Bungalow', label: 'Bungalow' },
    { value: 'Terrace', label: 'Terrace' },
    { value: 'Semi-Detached', label: 'Semi-Detached' },
    { value: 'Detached', label: 'Detached' },
    { value: 'Penthouse', label: 'Penthouse' },
    { value: 'Townhouse', label: 'Townhouse' },
    { value: 'Commercial', label: 'Commercial' },
  ];

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
  ];

  const bathroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [100000, 1000000000],
      bedrooms: '',
      bathrooms: '',
      propertyType: '',
      location: '',
    });
  };

  const formatPrice = (price) => {
    if (price >= 1_000_000_000) {
      return `₦${(price / 1_000_000_000).toFixed(2)}B`;
    }
    if (price >= 1_000_000) {
      return `₦${(price / 1_000_000).toFixed(1)}M`;
    }
    if (price >= 1_000) {
      return `₦${(price / 1_000).toFixed(0)}K`;
    }
    return `₦${price}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.container}
    >
      {/* Price Range */}
      <div className={styles.filterBlock}>
        <label className={styles.label}>
          Price Range
        </label>
        <div className={styles.sliderWrapper}>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => handleFilterChange('priceRange', value)}
            max={1000000000}
            min={100000}
            step={50000}
          />
          <div className={styles.priceRange}>
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Property Type */}
      <div className={styles.filterBlock}>
        <label className={styles.label}>
          Property Type
        </label>
        <select
          value={filters.propertyType}
          onChange={(e) => handleFilterChange('propertyType', e.target.value)}
          className={styles.select}
        >
          {propertyTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* Bedrooms */}
      <div className={styles.filterBlock}>
        <label className={styles.label}>
          Bedrooms
        </label>
        <div className={styles.optionGrid}>
          {bedroomOptions.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleFilterChange('bedrooms', option.value)}
              className={`${styles.optionButton} ${filters.bedrooms === option.value ? styles.active : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className={styles.filterBlock}>
        <label className={styles.label}>
          Bathrooms
        </label>
        <div className={styles.optionGrid}>
          {bathroomOptions.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleFilterChange('bathrooms', option.value)}
              className={`${styles.optionButton} ${filters.bathrooms === option.value ? styles.active : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className={styles.filterBlock}>
        <label className={styles.label}>
          Location
        </label>
        <input
          type="text"
          placeholder="Enter city or neighborhood"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className={styles.input}
        />
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={clearFilters}
        className={styles.clearButton}
      >
        Clear All Filters
      </Button>
    </motion.div>
  );
};

export default PropertyFilters;