import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MysteryDiscountTab } from "../sections/MysteryDiscountTab";
import { MysteryDiscountModal } from "../sections/MysteryDiscountModal";
import { FloatingActions } from "../ui/FloatingActions";
import { useState } from "react";

function PublicLayout() {
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

export default PublicLayout;
