import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EnquiryProvider } from './context/EnquiryContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import EnquiryModal from './components/ui/EnquiryModal';
import SearchModal from './components/ui/SearchModal';

// Pages
import HomePage from './pages/HomePage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import ClothingPage from './pages/ClothingPage';
import ClothingCategoryPage from './pages/ClothingCategoryPage';
import ClothingDetailPage from './pages/ClothingDetailPage';
import FabricsPage from './pages/FabricsPage';
import FabricDetailPage from './pages/FabricDetailPage';
import BestSellersPage from './pages/BestSellersPage';
import FallInLovePage from './pages/FallInLovePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <EnquiryProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-brand-ivory text-brand-charcoal antialiased selection:bg-brand-gold/30 selection:text-brand-charcoal">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/new-arrivals" element={<NewArrivalsPage />} />
              <Route path="/clothing" element={<ClothingPage />} />
              <Route path="/clothing/:category" element={<ClothingCategoryPage />} />
              <Route path="/clothing/:category/:slug" element={<ClothingDetailPage />} />
              <Route path="/fabrics" element={<FabricsPage />} />
              <Route path="/fabrics/:slug" element={<FabricDetailPage />} />
              <Route path="/best-sellers" element={<BestSellersPage />} />
              <Route path="/fall-in-love" element={<FallInLovePage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />

          {/* Global Interactive Overlays */}
          <EnquiryModal />
          <SearchModal />
        </div>
      </Router>
    </EnquiryProvider>
  );
}
