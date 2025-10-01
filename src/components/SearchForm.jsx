import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import styles from './SearchForm.module.css';

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/search', { state: { searchData } });
  };

  const propertyTypes = [
    { value: '', label: 'Any Type' },
    { value: 'Duplex', label: 'Duplex' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Mansion', label: 'Mansion'},
    { value: 'Bungalow', label: 'Bungalow' },
    { value: 'Terrace', label: 'Terrace' },
    { value: 'Semi-Detached', label: 'Semi-Detached' },
    { value: 'Detached', label: 'Detached' },
    { value: 'Penthouse', label: 'Penthouse' },
    { value: 'Townhouse', label: 'Townhouse' },
    { value: 'Commercial', label: 'Commercial' },
  ];

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-50000000', label: 'Under ₦50M' },
    { value: '50000000-100000000', label: '₦50M - ₦100M' },
    { value: '100000000-200000000', label: '₦100M - ₦200M' },
    { value: '200000000-500000000', label: '₦200M - ₦500M' },
    { value: '500000000+', label: '₦500M+' },
  ];

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.searchBox}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Location */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <MapPin className={styles.icon} />
            Location
          </label>
          <input
            type="text"
            placeholder="Enter city, area, or estate"
            value={searchData.location}
            onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
            className={styles.input}
          />
        </div>

        {/* Property Type */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <Home className={styles.icon} />
            Property Type
          </label>
          <select
            value={searchData.propertyType}
            onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
            className={styles.input}
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <DollarSign className={styles.icon} />
            Price Range (₦)
          </label>
          <select
            value={searchData.priceRange}
            onChange={(e) => setSearchData({ ...searchData, priceRange: e.target.value })}
            className={styles.input}
          >
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Bedrooms
          </label>
          <select
            value={searchData.bedrooms}
            onChange={(e) => setSearchData({ ...searchData, bedrooms: e.target.value })}
            className={styles.input}
          >
            {bedroomOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className={styles.buttonWrapper}>
          <Button
            type="submit"
            size="lg"
            className={styles.searchButton}
          >
            <Search className={styles.icon} style={{ marginRight: 8 }} />
            Search
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchForm;