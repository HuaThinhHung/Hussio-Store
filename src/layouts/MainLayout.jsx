import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { MysteryDiscountTab } from '../components/sections/MysteryDiscountTab';
import { MysteryDiscountModal } from '../components/sections/MysteryDiscountModal';
import { useState } from 'react';

function MainLayout() {
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

export default MainLayout;
