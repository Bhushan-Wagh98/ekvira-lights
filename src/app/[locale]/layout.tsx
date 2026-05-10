import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { cn } from '@/utils';
import Preloader from '@/components/ui/Preloader';
import '@/styles/globals.css';

// --- Font Configuration ---

// Inter: Primary English font (loaded from Google Fonts CDN)
const inter = Inter({ subsets: ['latin'] });

// Hind: Local Devanagari font - used globally for both English & Marathi
const hind = localFont({
  src: [
    { path: '../../fonts/Hind-Light.ttf', weight: '300' },
    { path: '../../fonts/Hind-Regular.ttf', weight: '400' },
    { path: '../../fonts/Hind-Medium.ttf', weight: '500' },
    { path: '../../fonts/Hind-SemiBold.ttf', weight: '600' },
    { path: '../../fonts/Hind-Bold.ttf', weight: '700' },
  ],
  variable: '--font-hind',
});

// Jaini: Decorative font used only for the brand logo "एकवीरा लाइट्स"
const jaini = localFont({
  src: '../../fonts/Jaini-Regular.ttf',
  variable: '--font-jaini',
});

// --- JSON-LD Structured Data for Google SEO ---
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Ekvira Lights',
  description:
    'DJ Lights on Rent - Sharpy, Blinder, Bottom & Laser lights for weddings, parties, and events.',
  url: 'https://ekviralights.com',
  telephone: '+917721873991',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shemba, Tq. Nandura',
    addressLocality: 'Buldhana',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '20.83',
    longitude: '76.46',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  sameAs: [],
};

/**
 * Root Layout
 * Wraps all pages with fonts, i18n provider, preloader, and SEO metadata.
 */
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={cn(inter.className, hind.variable, jaini.variable, 'font-hind')}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        {/* Structured data for Google rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
