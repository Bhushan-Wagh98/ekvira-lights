import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Reviews from '@/components/sections/Reviews';
import InstagramPosts from '@/components/sections/InstagramPosts';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'Ekvira Lights - DJ Lights on Rent | Sharpy, Blinder, Bottom, Laser',
  description: 'Sharpy, Blinder, Bottom & Laser lights available on rent for weddings, parties, DJ nights, and all occasions in Mumbai.',
  keywords: 'DJ lights on rent, sharpy light rent, blinder light, bottom light, laser light, wedding lights, party lights, Mumbai',
  authors: [{ name: 'Ekvira Lights' }],
  openGraph: {
    title: 'Ekvira Lights - DJ Lights on Rent',
    description: 'Sharpy, Blinder, Bottom & Laser lights on rent for weddings, parties, and events.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Flashy neon background effects - fixed */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -left-20 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-[20%] -right-20 w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[60%] left-[30%] w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      <Header />
      <main>
        <Hero />
        <Gallery />
        <Services />
        <Reviews />
        <InstagramPosts />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
