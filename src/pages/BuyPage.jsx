import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, MapPin, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchForm from '@/components/SearchForm';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { usePropertyContext } from '@/context/PropertyContext';
import styles from './BuyPage.module.css';

const BuyPage = () => {
  const { properties } = usePropertyContext();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000000],
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    location: '',
  });

  const buyableProperties = useMemo(() => {
    return properties.filter(property => {
      const price = parseInt(String(property.price).replace(/[₦,]/g, ''));
      const meetsPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      const meetsBedrooms = !filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms);
      const meetsBathrooms = !filters.bathrooms || property.bathrooms >= parseInt(filters.bathrooms);
      const meetsType = !filters.propertyType || property.type === filters.propertyType;
      const meetsLocation = !filters.location ||
        property.location.toLowerCase().includes(filters.location.toLowerCase());

      return meetsPrice && meetsBedrooms && meetsBathrooms && meetsType && meetsLocation;
    });
  }, [properties, filters]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerInner}>
          <div className={styles.titleWrapper}>
            <ShoppingCart className={styles.icon} />
            <h1 className={styles.title}>Properties for Sale</h1>
          </div>
          <SearchForm />
        </div>
      </div>

      <div className={styles.mainContentWrapper}>
        <div className={styles.mainContent}>
          <div className={`${styles.sidebar} ${showFilters ? styles.showSidebar : styles.hideSidebar}`}>
            <div className={styles.sidebarInner}>
              <div className={styles.sidebarHeader}>
                <h3 className={styles.sidebarTitle}>Filter Properties</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  ×
                </Button>
              </div>
              <PropertyFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>

          <div className={styles.resultsSection}>
            <div className={styles.topBar}>
              <div>
                <h2 className={styles.resultsCount}>{buyableProperties.length} Properties Found</h2>
                <p className={styles.resultsNote}>
                  Explore homes, lands, and commercial properties across Nigeria.
                </p>
              </div>

              <div className={styles.controls}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <div className={styles.viewToggle}>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`${styles.toggleButton} ${viewMode === 'grid' ? styles.activeToggle : ''}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`${styles.toggleButton} ${viewMode === 'list' ? styles.activeToggle : ''}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {buyableProperties.length > 0 ? (
              <div className={viewMode === 'grid' ? styles.gridLayout : styles.listLayout}>
                {buyableProperties.map((property, index) => (
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
                <h3 className={styles.noResultsTitle}>
                  No Properties Match Your Criteria
                </h3>
                <p className={styles.noResultsNote}>
                  Try adjusting your search or filters. More properties are added daily!
                </p>
                <Button
                  onClick={() => setFilters({
                    priceRange: [0, 1000000000],
                    bedrooms: '',
                    bathrooms: '',
                    propertyType: '',
                    location: '',
                  })}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
