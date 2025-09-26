import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePropertyContext } from '@/context/PropertyContext';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Bed, Bath, Square, Phone } from 'lucide-react';
import { GiFamilyHouse } from "react-icons/gi";
import styles from './PropertyDetailPage.module.css';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { properties, toggleFavorite, favorites } = usePropertyContext();
  const navigate = useNavigate();
  const [showAuthError, setShowAuthError] = useState(false);

  // find the property by id
  const property = properties.find((p) => p.id === parseInt(id, 10));
  const isFavorite = favorites.includes(parseInt(id, 10));
  const user = JSON.parse(localStorage.getItem("grandRealtors_user"));

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

  // 4 sub-pictures
  //    fallback to [property.cover] if no images array exists
  const gallery = property.images?.length ? property.images : [property.cover];

  const [selectedImage, setSelectedImage] = useState(0);

  // Handler for protected actions
  const handleProtectedAction = (e, url) => {
    if (!user) {
      e.preventDefault();
      setShowAuthError(true);
      setTimeout(() => {
        setShowAuthError(false);
        navigate('/signin');
      }, 1500);
    }
    // else, allow default action (link works)
  };

  return (
    <div className={styles.detailPageWrapper}>
      {/* ----- Header ----- */}
      <div className={styles.detailHeader}>
        <Link to="/search" className={styles.backLink}>
          &larr; Back to Search
        </Link>

        <div className={styles.headerActions}>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open(
                `https://www.google.com/maps?q=${property.latitude},${property.longitude}`,
                '_blank'
              )
            }
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

      {/* ----- Main Content ----- */}
      <div className={styles.detailMain}>
        {/* Left side: Gallery & Info */}
        <div className={styles.detailLeft}>
          <div className={styles.imageGallery}>
            <img
              src={gallery[selectedImage]}
              alt="Main view"
              className={styles.mainImage}
            />
            <div className={styles.thumbnailRow}>
              {gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`${styles.thumbnail} ${
                    selectedImage === idx ? styles.activeThumbnail : ''
                  }`}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    cursor: 'pointer',
                    border:
                      selectedImage === idx ? '2px solid #2563eb' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          <div className={styles.propertyInfoCard}>
            <h1 className={styles.propertyTitle}>{property.title}</h1>

            <div className={styles.propertyMeta}>
              <span className={styles.badge}>{property.type}</span>
              <span className={styles.location}>
                <MapPin /> {property.location}
              </span>
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
                This stunning apartment offers the perfect blend of luxury and
                comfort in {property.location}. Spacious rooms, modern amenities,
                and beautiful finishes throughout.
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

        {/* Right side: Agent & Summary */}
        <div className={styles.detailRight}>
          <div className={styles.agentCard}>
            <GiFamilyHouse className={styles.agentAvatar} />
            <div>
              <div className={styles.agentName}>GRANDREALTORS</div>
              <div className={styles.agentRole}>Property Consultant</div>
              <div className={styles.agentRating}>⭐⭐⭐⭐⭐ (120 reviews)</div>
            </div>

            {/* Call Agent */}
            <a
              href="https://call.whatsapp.com/voice/mNtNEpLDgp8gbanhLEIiWq"
              target="_blank"
              className={styles.agentBtn}
              onClick={e => handleProtectedAction(e, "https://call.whatsapp.com/voice/mNtNEpLDgp8gbanhLEIiWq")}
            >
              <Phone /> Call Agent
            </a>
            {/* Send Message */}
            <a
              href="https://wa.me/2349069792022?text=Hello%20I%20am%20interested%20in%20the%20property%20"
              target="_blank"
              className={styles.agentBtn}
              onClick={e => handleProtectedAction(e, "https://wa.me/2349069792022?text=Hello%20I%20am%20interested%20in%20the%20property%20")}
            >
              Send Message
            </a>

            <div className={styles.agentNote}>
              Typically responds within 2 hours
            </div>
            {/* Auth error message */}
            {showAuthError && (
              <div style={{ color: "red", marginTop: 8, fontWeight: 500 }}>
                Please sign in to contact the agent.
              </div>
            )}
          </div>

          <div className={styles.summaryCard}>
            <h3>Property Details</h3>
            <div className={styles.summaryRow}>
              <span>Type:</span> <span>{property.type}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Year Built:</span> <span>2021</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Price:</span> <span>{property.price}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Size:</span> <span>{property.sqft} sqm</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Title Document:</span> <span>C of O</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
