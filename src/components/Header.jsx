import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Heart, ShoppingCart, Tag, Settings, Menu, X, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/buy', label: 'Buy', icon: ShoppingCart },
    { path: '/sell', label: 'Sell', icon: Tag },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/favorites', label: 'Favorites', icon: Heart },
  ];

  const user = JSON.parse(localStorage.getItem("grandRealtors_user"));

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerWrapper}>
        <Link to="/" className={styles.Headerlogo}>
          <div className={styles.logoIcon}>
            <Home />
          </div>
          <span>GrandRealtors</span>
        </Link>

        <nav className={styles.navbar}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (location.pathname.startsWith(item.path) && item.path !== '/');
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                <Icon className={styles.navIcon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.buttons}>
          <Link to="/signin">
            <Button variant="outline" size="sm" className={styles.btnsNOdesk}>
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" size="sm" className={styles.btnsNOdesk}>
              Sign Up
            </Button>
          </Link>
          <Link to="/sell" className={styles.btnsNOdesk}>
            <Button size="sm">
              List Your Property
            </Button>
          </Link>
        </div>

        {/* Profile Picture at the end */}
        <Link to="/profile" style={{ display: "flex", alignItems: "right" }}>
          {user && user.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #2563eb",
                background: "#f3f4f6",
              }}
            />
          ) : (
            <User style={{ width: 32, height: 32, color: "#2563eb" }} />
          )}
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={styles.menuBtn}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={styles.mobileMenu}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                <Icon className={styles.navIcon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className={styles.buttons}>
            <Link to="/signin" className={styles.mobileAuthBtn}>
              <Button variant="outline" size="tiny">
                Sign In
              </Button>
            </Link>
            <Link to="/signup" className={styles.mobileAuthBtn}>
              <Button variant="outline" size="tiny">
                Sign Up
              </Button>
            </Link>
          </div>

          
        </motion.div>
      )}
    </header>
  );
};

export default Header;