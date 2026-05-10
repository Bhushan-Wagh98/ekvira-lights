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

// SEO metadata for the homepage
export const metadata: Metadata = {
  title: 'Ekvira Lights - DJ Lights on Rent | Sharpy, Blinder, Bottom, Laser',
  description:
    'Sharpy, Blinder, Bottom & Laser lights available on rent for weddings, parties, DJ nights, and all occasions.',
  keywords:
    'DJ lights on rent, sharpy light rent, blinder light, bottom light, laser light, wedding lights, party lights',
  authors: [{ name: 'Ekvira Lights' }],
  openGraph: {
    title: 'Ekvira Lights - DJ Lights on Rent',
    description:
      'Sharpy, Blinder, Bottom & Laser lights on rent for weddings, parties, and events.',
    type: 'website',
    locale: 'en_IN',
  },
};

/**
 * Homepage - Landing page for Ekvira Lights
 *
 * Section order (based on user psychology):
 * 1. Hero - Emotional hook, first impression
 * 2. Gallery - Show don't tell, creates desire (FOMO trigger)
 * 3. Services - Logical justification after they want it
 * 4. Reviews - Social proof, removes doubt (trust builder)
 * 5. Instagram - Reinforces trust, shows active presence
 * 6. Contact - Final CTA for serious leads
 */
export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Fixed pulsing neon glow orbs - DJ lights theme background */}
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <div className="animate-pulse-glow absolute -left-20 top-[20%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
        <div
          className="animate-pulse-glow absolute -right-20 bottom-[20%] h-[400px] w-[400px] rounded-full bg-pink-600/20 blur-[100px]"
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className="animate-pulse-glow absolute left-[30%] top-[60%] h-[350px] w-[350px] rounded-full bg-cyan-500/15 blur-[100px]"
          style={{ animationDelay: '3s' }}
        />
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

      {/* Sticky WhatsApp button - always visible for instant booking */}
      <FloatingWhatsApp />
    </div>
  );
}
