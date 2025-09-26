import React, { createContext, useContext, useState, useEffect } from "react";

const PropertyContext = createContext();

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFeaturedProperties(
      properties.filter((p) => p.featured)
    );
  }, [properties]);
  useEffect(() => {
    setProperties([
      {
        id: 1,
        title: "Modern 3 Bedroom Flat",
        location: "Victoria Island, Lagos",
        price: "₦180,000,000",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 250,
        type: "Apartment",
        featured: true,
        latitude: 6.4281,
        longitude: 3.4216,
        cover: "/assets/properties/1a.jpg",
        images: [
          "/assets/properties/1a.jpg",
          "/assets/properties/1b.jpg",
          "/assets/properties/1c.jpg",
          "/assets/properties/1d.jpg",
          "/assets/properties/1e.jpg"
        ]
      },
      {
        id: 2,
        title: "Spacious 4 Bedroom Bungalow",
        location: "Asokoro, Abuja",
        price: "₦250,000,000",
        bedrooms: 4,
        bathrooms: 4,
        sqft: 700,
        type: "Bungalow",
        featured: true,
        latitude: 9.0346,
        longitude: 7.5248,
        cover: "/assets/properties/2a.jpg",
        images: [
          "/assets/properties/2a.jpg",
          "/assets/properties/2b.jpg",
          "/assets/properties/2c.jpg",
          "/assets/properties/2d.jpg",
          "/assets/properties/2e.jpg"
        ]
      },
      {
        id: 3,
        title: "Luxury Penthouse",
        location: "Banana Island, Lagos",
        price: "₦600,000,000",
        bedrooms: 5,
        bathrooms: 6,
        sqft: 1200,
        type: "Penthouse",
        featured: true,
        latitude: 6.4321,
        longitude: 3.4480,
        cover: "/assets/properties/3a.jpg",
        images: [
          "/assets/properties/3a.jpg",
          "/assets/properties/3b.jpg",
          "/assets/properties/3c.jpg",
          "/assets/properties/3d.jpg",
          "/assets/properties/3e.jpg",
          "/assets/properties/3f.jpg"
        ]
      },
      {
        id: 4,
        title: "Affordable 2 Bedroom Apartment",
        location: "Yaba, Lagos",
        price: "₦60,000,000",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 120,
        type: "Apartment",
        featured: false,
        latitude: 6.5146,
        longitude: 3.3869,
        cover: "/assets/properties/4a.jpg",
        images: [
          "/assets/properties/4a.jpg",
          "/assets/properties/4b.jpg",
          "/assets/properties/4c.jpg",
          "/assets/properties/4d.jpg"
        ]
      },
      {
        id: 5,
        title: "Detached Duplex",
        location: "Gwarinpa, Abuja",
        price: "₦350,000,000",
        bedrooms: 4,
        bathrooms: 5,
        sqft: 800,
        type: "Duplex",
        featured: true,
        latitude: 6.4367,
        longitude: 3.5366,
        cover: "/assets/properties/5a.jpg",
        images: [
          "/assets/properties/5a.jpg",
          "/assets/properties/5b.jpg",
          "/assets/properties/5c.jpg",
          "/assets/properties/5d.jpg",
          "/assets/properties/5e.jpg"
        ]
      },
      {
        id: 6,
        title: "Terrace House",
        location: "Gwarinpa, Abuja",
        price: "₦120,000,000",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 350,
        type: "Terrace",
        featured: false,
        latitude: 9.1021,
        longitude: 7.3986,
        cover: "/assets/properties/6a.jpg",
        images: [
          "/assets/properties/6a.jpg",
          "/assets/properties/6b.jpg",
          "/assets/properties/6c.jpg",
          "/assets/properties/6d.jpg"
        ]
      },
      {
        id: 7,
        title: "Commercial Office Space",
        location: "Central Area, Abuja",
        price: "₦500,000,000",
        bedrooms: 0,
        bathrooms: 4,
        sqft: 2000,
        type: "Commercial",
        featured: false,
        latitude: 9.0578,
        longitude: 7.4951,
        cover: "/assets/properties/7a.jpg",
        images: [
          "/assets/properties/7a.jpg",
          "/assets/properties/7b.jpg",
          "/assets/properties/7c.jpg",
          "/assets/properties/7d.jpg"
        ]
      },
      {
        id: 8,
        title: "Studio Apartment",
        location: "Surulere, Lagos",
        price: "₦35,000,000",
        bedrooms: 1,
        bathrooms: 1,
        sqft: 60,
        type: "Studio",
        featured: false,
        latitude: 6.5000,
        longitude: 3.3500,
        cover: "/assets/properties/8a.jpg",
        images: [
          "/assets/properties/8a.jpg",
          "/assets/properties/8b.jpg",
          "/assets/properties/8c.jpg",
          "/assets/properties/8d.jpg"
        ]
      },
      {
        id: 9,
        title: "Land for Sale",
        location: "Ajah, Lagos",
        price: "₦80,000,000",
        bedrooms: 0,
        bathrooms: 0,
        sqft: 1500,
        type: "Land",
        featured: false,
        latitude: 6.4675,
        longitude: 3.6021,
        cover: "/assets/properties/9a.jpg",
        images: [
          "/assets/properties/9a.jpg",
          "/assets/properties/9b.jpg",
          "/assets/properties/9c.jpg",
          "/assets/properties/9d.jpg"
        ]
      },
      {
        id: 10,
        title: "Semi-Detached Duplex",
        location: "Magodo, Lagos",
        price: "₦220,000,000",
        bedrooms: 4,
        bathrooms: 4,
        sqft: 600,
        type: "Semi-Detached",
        featured: false,
        latitude: 6.6018,
        longitude: 3.3715,
        cover: "/assets/properties/10a.jpg",
        images: [
          "/assets/properties/10a.jpg",
          "/assets/properties/10b.jpg",
          "/assets/properties/10c.jpg",
          "/assets/properties/10d.jpg"
        ]
      },
      {
        id: 11,
        title: "Town House",
        location: "Ikoyi, Lagos",
        price: "₦400,000,000",
        bedrooms: 5,
        bathrooms: 5,
        sqft: 1100,
        type: "Townhouse",
        featured: true,
        latitude: 6.4541,
        longitude: 3.4246,
        cover: "/assets/properties/11a.jpg",
        images: [
          "/assets/properties/11a.jpg",
          "/assets/properties/11b.jpg",
          "/assets/properties/11c.jpg",
          "/assets/properties/11d.jpg"
        ]
      },
      {
        id: 12,
        title: "Luxury Detached Mansion",
        location: "Maitama, Abuja",
        price: "₦950,000,000",
        bedrooms: 7,
        bathrooms: 8,
        sqft: 3000,
        type: "Mansion",
        featured: true,
        latitude: 9.0765,
        longitude: 7.4926,
        cover: "/assets/properties/12a.jpg",
        images: [
          "/assets/properties/12a.jpg",
          "/assets/properties/12b.jpg",
          "/assets/properties/12c.jpg",
          "/assets/properties/12d.jpg",
          "/assets/properties/12e.jpg",
          "/assets/properties/12f.jpg"
        ]
      },
      {
        id: 13,
        title: "Affordable Mini Flat",
        location: "Ogba, Lagos",
        price: "₦25,000,000",
        bedrooms: 1,
        bathrooms: 1,
        sqft: 45,
        type: "Apartment",
        featured: false,
        latitude: 6.6342,
        longitude: 3.3376,
        cover: "/assets/properties/13a.jpg",
        images: [
          "/assets/properties/13a.jpg",
          "/assets/properties/13b.jpg",
          "/assets/properties/13c.jpg",
          "/assets/properties/13d.jpg"
        ]
      },
      {
        id: 14,
        title: "Detached Bungalow",
        location: "Abeokuta, Ogun",
        price: "₦70,000,000",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 400,
        type: "Bungalow",
        featured: false,
        latitude: 7.1600,
        longitude: 3.3500,
        cover: "/assets/properties/14a.jpg",
        images: [
          "/assets/properties/14a.jpg",
          "/assets/properties/14b.jpg",
          "/assets/properties/14c.jpg",
          "/assets/properties/14d.jpg",
          "/assets/properties/14e.jpg",
          "/assets/properties/14f.jpg"
        ]
      },
      {
        id: 15,
        title: "Commercial Shop",
        location: "Onitsha, Anambra",
        price: "₦55,000,000",
        bedrooms: 0,
        bathrooms: 1,
        sqft: 80,
        type: "Commercial",
        featured: false,
        latitude: 6.1456,
        longitude: 6.8020,
        cover: "/assets/properties/15a.jpg",
        images: [
          "/assets/properties/15a.jpg",
          "/assets/properties/15b.jpg",
          "/assets/properties/15c.jpg",
          "/assets/properties/15d.jpg"
        ]
      },
      {
        id: 16,
        title: "Luxury 5 Bedroom Duplex",
        location: "Enugu, Enugu",
        price: "₦320,000,000",
        bedrooms: 5,
        bathrooms: 6,
        sqft: 950,
        type: "Duplex",
        featured: true,
        latitude: 6.5244,
        longitude: 7.5086,
        cover: "/assets/properties/16a.jpg",
        images: [
          "/assets/properties/16a.jpg",
          "/assets/properties/16b.jpg",
          "/assets/properties/16c.jpg",
          "/assets/properties/16d.jpg",
          "/assets/properties/16e.jpg",
          "/assets/properties/16f.jpg"
        ]
      },
      {
        id: 17,
        title: "Affordable Land",
        location: "Ibadan, Oyo",
        price: "₦40,000,000",
        bedrooms: 0,
        bathrooms: 0,
        sqft: 1200,
        type: "Land",
        featured: false,
        latitude: 7.3775,
        longitude: 3.9470,
        cover: "/assets/properties/17a.jpg",
        //images: [
          //"/assets/properties/17a.jpg",
          //"/assets/properties/17b.jpg",
          //"/assets/properties/17c.jpg",
          //"/assets/properties/17d.jpg"]
      },
      {
        id: 18,
        title: "Mini Studio Apartment",
        location: "Calabar, Cross River",
        price: "₦28,000,000",
        bedrooms: 1,
        bathrooms: 1,
        sqft: 40,
        type: "Studio",
        featured: false,
        latitude: 4.9589,
        longitude: 8.3269,
        cover: "/assets/properties/18a.jpg",
        images: [
          "/assets/properties/18a.jpg",
          "/assets/properties/18b.jpg",
          "/assets/properties/18c.jpg",
          "/assets/properties/18d.jpg"
        ]
      },
      {
        id: 19,
        title: "Terrace Duplex",
        location: "Port Harcourt, Rivers",
        price: "₦210,000,000",
        bedrooms: 4,
        bathrooms: 5,
        sqft: 700,
        type: "Terrace",
        featured: true,
        latitude: 4.8242,
        longitude: 7.0336,
        cover: "/assets/properties/19a.jpg",
        images: [
          "/assets/properties/19a.jpg",
          "/assets/properties/19b.jpg",
          "/assets/properties/19c.jpg",
          "/assets/properties/19d.jpg",
          "/assets/properties/19e.jpg"
        ]
      },
      {
        id: 20,
        title: "Luxury Penthouse",
        location: "Ikoyi, Lagos",
        price: "₦850,000,000",
        bedrooms: 6,
        bathrooms: 7,
        sqft: 1500,
        type: "Penthouse",
        featured: true,
        latitude: 6.4541,
        longitude: 3.4246,
        cover: "/assets/properties/20a.jpg",
        images: [
          "/assets/properties/20a.jpg",
          "/assets/properties/20b.jpg",
          "/assets/properties/20c.jpg",
          "/assets/properties/20d.jpg"
        ]
      }
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem('grandRealtors_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (propertyId) => {
    setFavorites(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const addProperty = (newProperty) => {
    setProperties(prev => [newProperty, ...prev]);
    if (newProperty.featured) {
      setFeaturedProperties(prev => [newProperty, ...prev].filter(p => p.featured).slice(0, 6));
    }
  };

  const value = {
    properties,
    featuredProperties,
    favorites,
    loading,
    toggleFavorite,
    addProperty,
    setProperties,
    fetchProperties: () => {},
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};
