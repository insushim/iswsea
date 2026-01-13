import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Rooms from "@/components/Rooms";
import Special from "@/components/Special";
import Tour from "@/components/Tour";
import Location from "@/components/Location";
import Guide from "@/components/Guide";
import Reservation from "@/components/Reservation";
import Notice from "@/components/Notice";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import EventPopup from "@/components/EventPopup";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

// PC 섹션 간격 컴포넌트
const SectionSpacer = ({ className = "" }: { className?: string }) => (
  <div className={`hidden lg:block h-20 ${className}`} />
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <SectionSpacer className="bg-[var(--background-alt)]" />
      <Rooms />
      <SectionSpacer className="bg-[#0F1419]" />
      <Special />
      <SectionSpacer className="bg-[var(--background-alt)]" />
      <Tour />
      <SectionSpacer className="bg-[var(--background)]" />
      <Location />
      <SectionSpacer className="bg-[#0F1419]" />
      <Guide />
      <SectionSpacer className="bg-[#0F1419]" />
      <Reservation />
      <SectionSpacer className="bg-[#0F1419]" />
      <Notice />
      <Footer />
      <FloatingCTA />
      <EventPopup />
      <PWAInstallPrompt />
    </main>
  );
}
