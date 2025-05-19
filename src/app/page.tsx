import ClientsSection from "@/components/ClientsSection";
import DishesSection from "@/components/DishesSection";
import HeroSection from "@/components/HeroSection";
import TeamSection from "@/components/TeamSection";
import { Toaster } from "react-hot-toast";
export default function Home() {
  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <HeroSection />
      <DishesSection />
      <TeamSection />
      <ClientsSection />
    </div>
  );
}
