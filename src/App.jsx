import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { Toaster } from '@/components/ui/toaster';
//import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import PropertyDetailPage from '@/pages/PropertyDetailPage';
import FavoritesPage from '@/pages/FavoritesPage';
import BuyPage from '@/pages/BuyPage';
import SellPage from '@/pages/SellPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import { PropertyProvider } from '@/context/PropertyContext';
import UserSignIn from '@/pages/UserSignIn';
import UserSignUp from '@/pages/UserSignUp';
import Footer from '@/components/Footer';
import FooterInfoPage from '@/pages/FooterInfoPage';
import ProfilePage from '@/pages/ProfilePage';
import Contact from '@/pages/Contact';

function App() {
  return (
    <PropertyProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/signin" element={<UserSignIn />} />
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/footer-info" element={<FooterInfoPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </PropertyProvider>
  );
}

export default App;
//<Toaster />