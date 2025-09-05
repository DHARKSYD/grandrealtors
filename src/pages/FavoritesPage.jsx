import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import { usePropertyContext } from '@/context/PropertyContext';
import { Link } from 'react-router-dom';
import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const { properties, favorites } = usePropertyContext();

  const favoriteProperties = properties.filter(property =>
    favorites.includes(property.id)
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <div className={styles.titleRow}>
            <Heart className={styles.heartIcon} />
            <h1 className={styles.title}>My Favorites</h1>
          </div>
          <p className={styles.subtitle}>
            {favoriteProperties.length > 0
              ? `You have ${favoriteProperties.length} saved ${favoriteProperties.length === 1 ? 'property' : 'properties'}`
              : "You haven't saved any properties yet"
            }
          </p>
        </motion.div>

        {favoriteProperties.length > 0 ? (
          <div className={styles.grid}>
            {favoriteProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.emptyState}
          >
            <div className={styles.emptyIconContainer}>
              <Home className={styles.emptyIcon} />
            </div>
            <h3 className={styles.emptyTitle}>
              No Favorite Properties Yet
            </h3>
            <p className={styles.emptyDescription}>
              Start exploring properties and save your favorites by clicking the heart icon. 
              Your saved properties will appear here for easy access.
            </p>
            <Link to="/search">
              <Button size="lg" className={styles.browseButton}>
                Browse Properties
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
