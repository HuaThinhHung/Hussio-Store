import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { MysteryDiscountTab } from "../components/sections/MysteryDiscountTab";
import { MysteryDiscountModal } from "../components/sections/MysteryDiscountModal";
import { FloatingActions } from "../components/ui/FloatingActions";
import { useState } from "react";

function MainLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  return (
    <div className="flex min-h-dvh flex-col bg-white font-sans text-neutral-900 antialiased">
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
      <main
        id="main-content"
        className="min-w-0 flex-1 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] lg:pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
      >
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default MainLayout;
