import { Outlet, Link, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MysteryDiscountTab } from '../sections/MysteryDiscountTab';
import { MysteryDiscountModal } from '../sections/MysteryDiscountModal';
import { useState } from 'react';

function PublicLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 antialiased">
      <MysteryDiscountTab 
        onClick={() => setIsModalOpen(true)} 
        isTabVisible={isTabVisible}
        setIsTabVisible={setIsTabVisible}
      />
      <MysteryDiscountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
