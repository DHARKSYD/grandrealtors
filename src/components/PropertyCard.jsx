import React, { useState } from 'react';
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

  const [selectedImage, setSelectedImage] = useState(0);

  // ✅ main/cover image is always property.cover
  const mainImage = property.cover
    ? property.cover
    : 'https://images.unsplash.com/photo-1703023428152-133db49ad592';

  // ✅ sub-images for optional small thumbnails
  const images =
    property.images && property.images.length > 0
      ? property.images
      : [mainImage];

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
    toast({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      description: isFavorite
        ? 'Property removed from your favorites list'
        : 'Property added to your favorites list',
    });
  };

  

  /* ---------------- Grid View ---------------- */
  return (
    <motion.div whileHover={{ y: -4 }} className={styles.card}>
      <Link to={`/property/${property.id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          {/* main cover */}
          <img
            className={styles.propertyImage}
            alt={`${property.title} exterior view`}
            src={images[selectedImage]}
            loading="lazy"
          />

          {/* optional small thumbnails */}
          {images.length > 1 && (
            <div
              style={{
                display: 'flex',
                gap: 4,
                marginTop: 4,
                justifyContent: 'center',
              }}
            >
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  style={{
                    width: 36,
                    height: 36,
                    objectFit: 'cover',
                    borderRadius: 6,
                    border:
                      selectedImage === idx
                        ? '2px solid #2563eb'
                        : '1px solid #eee',
                    cursor: 'pointer',
                    opacity: selectedImage === idx ? 1 : 0.7,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedImage(idx);
                  }}
                />
              ))}
            </div>
          )}

          <button
            onClick={handleFavoriteToggle}
            className={styles.favoriteBtn}
            aria-label="Save Property"
          >
            <Heart
              className={isFavorite ? styles.heartFavorite : styles.heartNotFavorite}
            />
          </button>
          <span className={styles.badge}>{property.type}</span>
        </div>

        <div className={styles.details}>
          <h3 className={styles.title}>{property.title}</h3>
          <div className={styles.location}>
            <MapPin style={{ marginRight: 4 }} /> {property.location}
          </div>
          <div className={styles.price}>{property.price}</div>
          <div className={styles.stats}>
            <span className={styles.statItem}>
              <Bed style={{ marginRight: 4 }} /> {property.bedrooms}
            </span>
            <span className={styles.statItem}>
              <Bath style={{ marginRight: 4 }} /> {property.bathrooms}
            </span>
            <span className={styles.statItem}>
              <Square style={{ marginRight: 4 }} /> {property.sqft}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
