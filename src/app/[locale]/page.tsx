import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Reviews from '@/components/sections/Reviews';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

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
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
