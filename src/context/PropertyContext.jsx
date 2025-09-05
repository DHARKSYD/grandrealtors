import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(false); // No DB call now, so no need to set loading true initially

  useEffect(() => {
    // Fetch properties from local/static source (you can change this later to fetch from your own API)
    // Example dummy data
    const initialProperties = [
  {
    "id": 1,
    "title": "Modern 3 Bedroom Flat",
    "location": "Victoria Island, Lagos",
    "price": "₦180,000,000",
    "bedrooms": 3,
    "bathrooms": 3,
    "sqft": 250,
    "type": "Apartment",
    "featured": true,
    "latitude": 6.4281,
    "longitude": 3.4216
  },
  {
    "id": 2,
    "title": "Spacious 4 Bedroom Bungalow",
    "location": "Asokoro, Abuja",
    "price": "₦250,000,000",
    "bedrooms": 4,
    "bathrooms": 4,
    "sqft": 700,
    "type": "Bungalow",
    "featured": true,
    "latitude": 9.0346,
    "longitude": 7.5248
  },
  {
    "id": 3,
    "title": "Luxury Penthouse",
    "location": "Banana Island, Lagos",
    "price": "₦600,000,000",
    "bedrooms": 5,
    "bathrooms": 6,
    "sqft": 1200,
    "type": "Penthouse",
    "featured": true,
    "latitude": 6.4321,
    "longitude": 3.4480
  },
  {
    "id": 4,
    "title": "Affordable Mini Flat",
    "location": "Yaba, Lagos",
    "price": "₦35,000,000",
    "bedrooms": 1,
    "bathrooms": 1,
    "sqft": 60,
    "type": "Mini Flat",
    "featured": false,
    "latitude": 6.5095,
    "longitude": 3.3781
  },
  {
    "id": 5,
    "title": "Classic 2 Bedroom Apartment",
    "location": "Gwarinpa, Abuja",
    "price": "₦60,000,000",
    "bedrooms": 2,
    "bathrooms": 2,
    "sqft": 120,
    "type": "Apartment",
    "featured": false,
    "latitude": 9.1044,
    "longitude": 7.4033
  },
  {
    "id": 6,
    "title": "Modern Studio Apartment",
    "location": "Lekki, Lagos",
    "price": "₦40,000,000",
    "bedrooms": 1,
    "bathrooms": 1,
    "sqft": 50,
    "type": "Studio",
    "featured": false,
    "latitude": 6.4426,
    "longitude": 3.4671
  },
  {
    "id": 7,
    "title": "Family 3 Bedroom Flat",
    "location": "Wuse 2, Abuja",
    "price": "₦90,000,000",
    "bedrooms": 3,
    "bathrooms": 2,
    "sqft": 200,
    "type": "Flat",
    "featured": false,
    "latitude": 9.0662,
    "longitude": 7.4898
  },
  {
    "id": 8,
    "title": "Luxury 6 Bedroom Mansion",
    "location": "Ikoyi, Lagos",
    "price": "₦900,000,000",
    "bedrooms": 6,
    "bathrooms": 7,
    "sqft": 2000,
    "type": "Mansion",
    "featured": true,
    "latitude": 6.4483,
    "longitude": 3.4373
  },
  {
    "id": 9,
    "title": "Affordable 2 Bedroom Bungalow",
    "location": "Garki, Abuja",
    "price": "₦55,000,000",
    "bedrooms": 2,
    "bathrooms": 2,
    "sqft": 150,
    "type": "Bungalow",
    "featured": false,
    "latitude": 9.0310,
    "longitude": 7.4906
  },
  {
    "id": 10,
    "title": "Modern Duplex",
    "location": "Magodo, Lagos",
    "price": "₦200,000,000",
    "bedrooms": 4,
    "bathrooms": 5,
    "sqft": 400,
    "type": "Duplex",
    "featured": true,
    "latitude": 6.6233,
    "longitude": 3.3796
  },
  {
    "id": 11,
    "title": "Serviced 3 Bedroom Apartment",
    "location": "Maitama, Abuja",
    "price": "₦120,000,000",
    "bedrooms": 3,
    "bathrooms": 3,
    "sqft": 180,
    "type": "Apartment",
    "featured": false,
    "latitude": 9.0817,
    "longitude": 7.5044
  },
  {
    "id": 12,
    "title": "Detached 5 Bedroom House",
    "location": "Ajah, Lagos",
    "price": "₦170,000,000",
    "bedrooms": 5,
    "bathrooms": 6,
    "sqft": 600,
    "type": "Detached",
    "featured": false,
    "latitude": 6.4675,
    "longitude": 3.6022
  },
  {
    "id": 13,
    "title": "Classic 4 Bedroom Terrace",
    "location": "Gudu, Abuja",
    "price": "₦110,000,000",
    "bedrooms": 4,
    "bathrooms": 4,
    "sqft": 350,
    "type": "Terrace",
    "featured": false,
    "latitude": 9.0183,
    "longitude": 7.4798
  },
  {
    "id": 14,
    "title": "Affordable 1 Bedroom Studio",
    "location": "Surulere, Lagos",
    "price": "₦25,000,000",
    "bedrooms": 1,
    "bathrooms": 1,
    "sqft": 40,
    "type": "Studio",
    "featured": false,
    "latitude": 6.5003,
    "longitude": 3.3544
  },
  {
    "id": 15,
    "title": "Luxury 3 Bedroom Flat",
    "location": "Jabi, Abuja",
    "price": "₦150,000,000",
    "bedrooms": 3,
    "bathrooms": 3,
    "sqft": 220,
    "type": "Flat",
    "featured": true,
    "latitude": 9.0821,
    "longitude": 7.4294
  },
  {
    "id": 16,
    "title": "Modern 2 Bedroom Apartment",
    "location": "Ikeja, Lagos",
    "price": "₦80,000,000",
    "bedrooms": 2,
    "bathrooms": 2,
    "sqft": 110,
    "type": "Apartment",
    "featured": false,
    "latitude": 6.6018,
    "longitude": 3.3515
  },
  {
    "id": 17,
    "title": "Classic 5 Bedroom Duplex",
    "location": "Asokoro, Abuja",
    "price": "₦300,000,000",
    "bedrooms": 5,
    "bathrooms": 6,
    "sqft": 800,
    "type": "Duplex",
    "featured": true,
    "latitude": 9.0450,
    "longitude": 7.5300
  },
  {
    "id": 18,
    "title": "Affordable 2 Bedroom Flat",
    "location": "Ogba, Lagos",
    "price": "₦45,000,000",
    "bedrooms": 2,
    "bathrooms": 2,
    "sqft": 90,
    "type": "Flat",
    "featured": false,
    "latitude": 6.6342,
    "longitude": 3.3515
  },
  {
    "id": 19,
    "title": "Luxury 4 Bedroom Penthouse",
    "location": "Wuse, Abuja",
    "price": "₦400,000,000",
    "bedrooms": 4,
    "bathrooms": 5,
    "sqft": 950,
    "type": "Penthouse",
    "featured": true,
    "latitude": 9.0575,
    "longitude": 7.4826
  },
  {
    "id": 20,
    "title": "Modern 3 Bedroom Bungalow",
    "location": "Lekki, Lagos",
    "price": "₦130,000,000",
    "bedrooms": 3,
    "bathrooms": 3,
    "sqft": 300,
    "type": "Bungalow",
    "featured": false,
    "latitude": 6.4413,
    "longitude": 3.4781
  }
];
    setProperties(initialProperties);
    setFeaturedProperties(initialProperties.filter(p => p.featured).slice(0, 6));

    const savedFavorites = localStorage.getItem('grandRealtors_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
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
