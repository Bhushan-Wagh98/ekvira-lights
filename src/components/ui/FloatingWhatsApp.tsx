'use client';

import WhatsAppIcon from './WhatsAppIcon';

const FloatingWhatsApp = () => {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE?.replace(/[^0-9]/g, '') || '';

  return (
    <a
      href={`https://wa.me/${phone}?text=नमस्कार, मला माझ्या इव्हेंटसाठी DJ लाइट्स भाड्याने हवे आहेत.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.7)] transition-all hover:scale-110 animate-bounce"
      style={{ animationDuration: '2s', animationIterationCount: '3' }}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7 text-white" />
    </a>
  );
};

export default FloatingWhatsApp;
