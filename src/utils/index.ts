import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format currency for Indian market
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate slug from string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Indian phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(cleaned);
}

/**
 * Calculate lighting requirements
 */
export function calculateLighting(
  roomType: string,
  roomSize: number,
  ceilingHeight: number
) {
  // Lumens per square foot based on room type
  const lumensPerSqFt: Record<string, number> = {
    living_room: 20,
    bedroom: 15,
    kitchen: 50,
    bathroom: 75,
    office: 50,
    dining_room: 30,
    hallway: 10,
  };

  const baseLumens = lumensPerSqFt[roomType] || 30;
  
  // Adjust for ceiling height
  const heightMultiplier = ceilingHeight > 9 ? 1.2 : 1;
  
  const totalLumens = roomSize * baseLumens * heightMultiplier;
  
  // Estimate number of fixtures (assuming 800 lumens per fixture)
  const fixtures = Math.ceil(totalLumens / 800);
  
  // Estimate cost (₹500-2000 per fixture)
  const estimatedCost = fixtures * 1250;

  return {
    roomType,
    roomSize,
    ceilingHeight,
    recommendedLumens: Math.round(totalLumens),
    recommendedFixtures: fixtures,
    estimatedCost,
  };
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get image URL with optimization
 */
export function getOptimizedImageUrl(
  url: string,
  width?: number,
  height?: number
): string {
  if (!url) return '/images/placeholder.jpg';
  
  // If it's a Cloudinary URL, add transformations
  if (url.includes('cloudinary.com')) {
    const transformations = [];
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    transformations.push('c_fill', 'f_auto', 'q_auto');
    
    return url.replace('/upload/', `/upload/${transformations.join(',')}/`);
  }
  
  return url;
}

/**
 * Check if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Scroll to element smoothly
 */
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}