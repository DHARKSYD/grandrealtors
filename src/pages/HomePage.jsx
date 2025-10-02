import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, TrendingUp, Users, Award, Shield, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchForm from '@/components/SearchForm';
import PropertyCard from '@/components/PropertyCard';
import { usePropertyContext } from '@/context/PropertyContext';
import { Link } from "react-router-dom";
import styles from './HomePage.module.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const HomePage = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: '🚧 ALERT!',
      description:
        "We have recieved your Email, our agent will contact you soon! 🚀",
    });
  };
  
  const { properties } = usePropertyContext();
  const location = useLocation(); 

  const [filters, setFilters] = useState({
    priceRange: [0, 1000000000],
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    location: '',
  });

  // 👇 When arriving from HomePage SearchForm, prefill filters
  useEffect(() => {
    if (location.state?.searchData) {
      setFilters(prev => ({
        ...prev,
        ...location.state.searchData,
      }));
    }
  }, [location.state]);

// Handler for protected actions
  const handleProtectedAction = (e, url) => {
    if (!user) {
      e.preventDefault();
      setShowAuthError(true);
      setTimeout(() => {
        setShowAuthError(false);
      }, 2000);
    }
    // else, allow default action (link works)
  };

  const { featuredProperties } = usePropertyContext();

  const stats = [
    { icon: Home, label: 'Properties Listed', value: '10,000+' },
    { icon: Users, label: 'Happy Clients', value: '5,000+' },
    { icon: Award, label: 'Industry Awards', value: '5+' },
    { icon: Shield, label: 'Years in Nigeria', value: '8+' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Find your perfect home with our powerful search filters and map integration across Nigeria.',
    },
    {
      icon: MapPin,
      title: 'Local Insights',
      description: 'Get detailed information about neighborhoods, schools, and amenities in Lagos, Abuja, and more.',
    },
    {
      icon: TrendingUp,
      title: 'Market Trends',
      description: 'Access real-time Nigerian property market data and value estimates.',
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.heroText}
          >
            <h1 className={styles.heroTitle}>
              Find Your Dream Property in Nigeria
            </h1>
            <p className={styles.heroSubtitle}>
              Discover the perfect property with GrandRealtors. 
              Search, explore, and connect with your future home in Nigeria.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.heroForm}
          >
            <SearchForm />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={styles.statCard}
              >
                <div className={styles.statIcon}><Icon /></div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      

      {/* Featured Properties */}
      <section className={styles.featuredSection}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.featuredHeader}
        >
          <h2 className={styles.featuredTitle}>Featured Properties in Nigeria</h2>
          <p className={styles.featureSubtitle}>
            Discover our handpicked selection of premium properties in prime Nigerian locations.
          </p>
        </motion.div>

        <div className={styles.propertyGrid}>
          {featuredProperties.slice(0, 6).map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        <div className={styles.ViewAllPropertiesButton}>
          <Link to="/search" aria-label="View all properties">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Properties
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.featuredHeader}
        >
          <h2 className={styles.sectionTitle}>Why Choose GrandRealtors?</h2>
          <p className={styles.sectionSubtitle}>
            We provide the local expertise and tools you need for informed real estate decisions in Nigeria.
          </p>
        </motion.div>

        <div className={styles.featureGrid}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={styles.featureCard}
              >
                <div className={styles.featureIcon}><Icon /></div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.ctaContent}
        >
          <h2 className={styles.ctaTitle}>
            Ready to Find Your Nigerian Dream Home?
          </h2>
          <p className={styles.ctaSubtitle}>
            Join thousands of satisfied clients who found their perfect property with GrandRealtors.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/search">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Your Search
              </Button>
            </Link>
            <Link to="/sell">
              <Button size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                List Your Property With Us
              </Button>
            </Link>
            
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
