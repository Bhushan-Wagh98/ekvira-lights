// Database abstraction layer - works with both SQLite and Supabase
import { dbHelpers } from './sqlite';

// Use SQLite for local development (no external accounts needed)
export const db = {
  // Business info
  async getBusinessInfo() {
    return dbHelpers.getBusinessInfo();
  },

  // Services
  async getServices() {
    return dbHelpers.getServices();
  },

  // Gallery
  async getGalleryItems() {
    return dbHelpers.getGalleryItems();
  },

  // Inquiries
  async createInquiry(data: any) {
    return dbHelpers.createInquiry(data);
  },

  async getInquiries() {
    return dbHelpers.getInquiries();
  },

  async updateInquiryStatus(id: string, status: string) {
    return dbHelpers.updateInquiryStatus(id, status);
  },

  // Placeholder functions for future features
  async createGalleryItem(data: any) {
    // TODO: Implement when admin panel is ready
    throw new Error('Not implemented yet');
  },

  async updateGalleryItem(id: string, data: any) {
    // TODO: Implement when admin panel is ready
    throw new Error('Not implemented yet');
  },

  async deleteGalleryItem(id: string) {
    // TODO: Implement when admin panel is ready
    throw new Error('Not implemented yet');
  },

  async createService(data: any) {
    // TODO: Implement when admin panel is ready
    throw new Error('Not implemented yet');
  },

  async updateService(id: string, data: any) {
    // TODO: Implement when admin panel is ready
    throw new Error('Not implemented yet');
  },

  async updateBusinessInfo(data: any) {
    // TODO: Implement when admin panel is ready
    throw new Error('Not implemented yet');
  },
};