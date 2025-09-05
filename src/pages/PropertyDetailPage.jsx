import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePropertyContext } from '@/context/PropertyContext';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Bed, Bath, Square, Phone, User } from 'lucide-react';
import styles from './PropertyDetailPage.module.css';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { properties, toggleFavorite, favorites } = usePropertyContext();
  const property = properties.find((p) => p.id === parseInt(id));
  const isFavorite = favorites.includes(parseInt(id));

  if (!property) {
    return (
      <div className={styles.centeredPage}>
        <h2>Property Not Found</h2>
        <Link to="/search">
          <Button>Back to Search</Button>
        </Link>
      </div>
    );
  }

  // Dummy images for gallery
  const images = [
    "https://images.unsplash.com/photo-1703023428152-133db49ad592",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1460518451285-97b6aa326961",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
  ];

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className={styles.detailPageWrapper}>
      <div className={styles.detailHeader}>
        <Link to="/search" className={styles.backLink}>
          &larr; Back to Search
        </Link>
        <div className={styles.headerActions}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              window.open(
                `https://www.google.com/maps?q=${property.latitude},${property.longitude}`,
                '_blank'
              );
            }}
          >
            View on Map
          </Button>
          <Button variant="outline" size="sm">Share</Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFavorite(property.id)}
            className={isFavorite ? styles.favoriteActive : ''}
          >
            <Heart className={isFavorite ? styles.heartFilled : ''} />
            {isFavorite ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>

      <div className={styles.detailMain}>
        {/* Left: Images and Details */}
        <div className={styles.detailLeft}>
          <div className={styles.imageGallery}>
            <img
              src={images[selectedImage]}
              alt="Main"
              className={styles.mainImage}
            />
            <div className={styles.thumbnailRow}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb${idx}`}
                  className={`${styles.thumbnail} ${selectedImage === idx ? styles.activeThumbnail : ''}`}
                  onClick={() => setSelectedImage(idx)}
                  style={{ cursor: 'pointer', border: selectedImage === idx ? '2px solid #2563eb' : '' }}
                />
              ))}
            </div>
          </div>
          <div className={styles.propertyInfoCard}>
            <h1 className={styles.propertyTitle}>{property.title}</h1>
            <div className={styles.propertyMeta}>
              <span className={styles.badge}>{property.type}</span>
              <span className={styles.location}><MapPin /> {property.location}</span>
            </div>
            <div className={styles.price}>{property.price}</div>
            <div className={styles.statsRow}>
              <span><Bed /> {property.bedrooms} bedrooms</span>
              <span><Bath /> {property.bathrooms} bathrooms</span>
              <span><Square /> {property.sqft} sqm</span>
            </div>
            <div className={styles.description}>
              <h3>Description</h3>
              <p>
                {/* Description of my property */}
                This stunning apartment offers the perfect blend of luxury and comfort in {property.location}. Spacious rooms, modern amenities, and beautiful finishes throughout.
              </p>
            </div>
            <div className={styles.amenities}>
              <h3>Key Amenities</h3>
              <div className={styles.amenityList}>
                <span className={styles.amenity}>Ample Parking</span>
                <span className={styles.amenity}>24/7 Security</span>
                <span className={styles.amenity}>Gym Access</span>
                <span className={styles.amenity}>Clean Water</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Agent and Summary */}
        <div className={styles.detailRight}>
          <div className={styles.agentCard}>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Agent" className={styles.agentAvatar} />
            <div>
              <div className={styles.agentName}>David Orendu</div>
              <div className={styles.agentRole}>Property Consultant</div>
              <div className={styles.agentRating}>⭐⭐⭐⭐⭐ (120 reviews)</div>
            </div>
            <Button className={styles.agentBtn}><Phone /> Call Agent</Button>
            <Button variant="outline" className={styles.agentBtn}>Send Message</Button>
            <Button variant="outline" className={styles.agentBtn}>Schedule Viewing</Button>
            <div className={styles.agentNote}>Typically responds within 2 hours</div>
          </div>
          <div className={styles.summaryCard}>
            <h3>Property Details</h3>
            <div className={styles.summaryRow}><span>Type:</span> <span>{property.type}</span></div>
            <div className={styles.summaryRow}><span>Year Built:</span> <span>2021</span></div>
            <div className={styles.summaryRow}><span>Price:</span> <span>{property.price}</span></div>
            <div className={styles.summaryRow}><span>Size:</span> <span>{property.sqft} sqm</span></div>
            <div className={styles.summaryRow}><span>Title Document:</span> <span>C of O</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
