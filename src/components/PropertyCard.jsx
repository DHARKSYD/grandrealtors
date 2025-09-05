import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePropertyContext } from '@/context/PropertyContext';
import { toast } from '@/components/ui/use-toast';
import styles from './PropertyCard.module.css';

const PropertyCard = ({ property, viewMode = 'grid' }) => {
  const { toggleFavorite, favorites } = usePropertyContext();
  const isFavorite = favorites.includes(property.id);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? "Property removed from your favorites list" 
        : "Property added to your favorites list",
    });
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className={styles.cardList}
      >
        <Link to={`/property/${property.id}`} className={styles.link}>
          <div className={styles.imageWrapper}>
            <img  
              className={styles.propertyImage}
              alt={`${property.title} exterior view`}
              src="https://images.unsplash.com/photo-1703023428152-133db49ad592"
            />
            <button
              onClick={handleFavoriteToggle}
              className={styles.favoriteBtn}
            >
              <Heart className={isFavorite ? styles.heartFavorite : styles.heartNotFavorite} />
            </button>
            <span className={styles.badge}>{property.type}</span>
          </div>
          <div className={styles.details}>
            <h3 className={styles.title}>{property.title}</h3>
            <div className={styles.location}>
              <MapPin style={{ marginRight: 4 }} />
              {property.location}
            </div>
            <div className={styles.price}>{property.price}</div>
            <div className={styles.stats}>
              <span className={styles.statItem}>
                <Bed style={{ marginRight: 4 }} />
                {property.bedrooms} beds
              </span>
              <span className={styles.statItem}>
                <Bath style={{ marginRight: 4 }} />
                {property.bathrooms} baths
              </span>
              <span className={styles.statItem}>
                <Square style={{ marginRight: 4 }} />
                {property.sqft} sqft
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={styles.card}
    >
      <Link to={`/property/${property.id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img  
            className={styles.propertyImage}
            alt={`${property.title} exterior view`}
            src="https://images.unsplash.com/photo-1703023428152-133db49ad592"
          />
          <button
            onClick={handleFavoriteToggle}
            className={styles.favoriteBtn}
          >
            <Heart className={isFavorite ? styles.heartFavorite : styles.heartNotFavorite} />
          </button>
          <span className={styles.badge}>{property.type}</span>
        </div>
        <div className={styles.details}>
          <h3 className={styles.title}>{property.title}</h3>
          <div className={styles.location}>
            <MapPin style={{ marginRight: 4 }} />
            <span>{property.location}</span>
          </div>
          <div className={styles.price}>{property.price}</div>
          <div className={styles.stats}>
            <span className={styles.statItem}>
              <Bed style={{ marginRight: 4 }} />
              {property.bedrooms}
            </span>
            <span className={styles.statItem}>
              <Bath style={{ marginRight: 4 }} />
              {property.bathrooms}
            </span>
            <span className={styles.statItem}>
              <Square style={{ marginRight: 4 }} />
              {property.sqft}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;