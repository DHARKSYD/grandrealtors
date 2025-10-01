import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { usePropertyContext } from '@/context/PropertyContext';
import { useLocation } from 'react-router-dom';   // 👈 added
import styles from './SearchPage.module.css';

const SearchPage = () => {
  const { properties } = usePropertyContext();
  const location = useLocation(); // 👈 get search data from SearchForm
  const searchData = location.state?.searchData || {};

  const [viewMode, setViewMode] = useState(window.innerWidth >= 900 ? 'grid' : 'list');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000000],
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    location: '',
  });

  // 👇 Apply search form data when arriving from HomePage
  useEffect(() => {
    if (Object.keys(searchData).length > 0) {
      setFilters((prev) => ({
        ...prev,
        location: searchData.location || '',
        propertyType: searchData.type || '',
        priceRange: searchData.price ? [0, Number(searchData.price)] : prev.priceRange,
      }));
    }
  }, [searchData]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setViewMode('list');
      } else {
        setViewMode('grid');
        setShowFilters(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const price = parseInt(property.price.replace(/[₦,]/g, ''));
      const meetsPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      const meetsBedrooms = !filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms);
      const meetsBathrooms = !filters.bathrooms || property.bathrooms >= parseInt(filters.bathrooms);
      const meetsType = !filters.propertyType || property.type === filters.propertyType;
      const meetsLocation =
        !filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase());

      return meetsPrice && meetsBedrooms && meetsBathrooms && meetsType && meetsLocation;
    });
  }, [properties, filters]);

  // For closing filter panel when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains(styles.filterBackdrop)) {
      setShowFilters(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContentWrapper}>
        <div className={styles.mainContent}>
          {/* Desktop Sidebar */}
          <div className={styles.sidebarDesktop}>
            <div className={styles.sidebarInner}>
              <div className={styles.sidebarHeader}>
                <h3 className={styles.sidebarTitle}>Filter Properties</h3>
              </div>
              <PropertyFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>

          {/* Results Section */}
          <div className={styles.resultsSection}>
            <div className={styles.topBar}>
              <div>
                <h2 className={styles.resultsCount}>{filteredProperties.length} Properties Found</h2>
                <p className={styles.resultsNote}>
                  Showing results for your search criteria in Nigeria
                </p>
              </div>
            </div>

            {filteredProperties.length > 0 ? (
              <div className={viewMode === 'grid' ? styles.gridLayout : styles.listLayout}>
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <PropertyCard property={property} viewMode={viewMode} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <MapPin className={styles.noResultsIcon} />
                <h3 className={styles.noResultsTitle}>No Properties Found</h3>
                <p className={styles.noResultsNote}>
                  Try adjusting your search criteria or filters to find more properties in Nigeria.
                </p>
                <Button
                  onClick={() =>
                    setFilters({
                      priceRange: [0, 1000000000],
                      bedrooms: '',
                      bathrooms: '',
                      propertyType: '',
                      location: '',
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Filter Button (Mobile only) */}
      <Button
        variant="outline"
        size="lg"
        className={styles.floatingFilterBtn}
        onClick={() => setShowFilters(true)}
      >
        <Filter style={{ marginRight: 6 }} />
        Filters
      </Button>

      {/* Floating Filter Panel (Mobile only) */}
      {showFilters && (
        <div className={styles.filterBackdrop} onClick={handleBackdropClick}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className={styles.floatingFilterPanel}
          >
            <div className={styles.floatingFilterHeader}>
              <h3>Filter Properties</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
                style={{ fontSize: 24, lineHeight: 1 }}
              >
                ×
              </Button>
            </div>
            <PropertyFilters filters={filters} onFiltersChange={setFilters} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
