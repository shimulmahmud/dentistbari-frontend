export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      patients: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string;
          date_of_birth: string | null;
          address: string | null;
          emergency_contact: string | null;
          medical_history: Json;
          insurance_info: Json;
          preferred_language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          full_name: string;
          email: string;
          phone: string;
          date_of_birth?: string | null;
          address?: string | null;
          emergency_contact?: string | null;
          medical_history?: Json;
          insurance_info?: Json;
          preferred_language?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          full_name?: string;
          email?: string;
          phone?: string;
          date_of_birth?: string | null;
          address?: string | null;
          emergency_contact?: string | null;
          medical_history?: Json;
          insurance_info?: Json;
          preferred_language?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          title_bn: string | null;
          slug: string;
          category: string;
          description: string;
          description_bn: string | null;
          short_description: string;
          short_description_bn: string | null;
          price_range: string | null;
          duration: string | null;
          image_url: string | null;
          benefits: Json;
          procedure_steps: Json;
          is_featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          title_bn?: string | null;
          slug: string;
          category: string;
          description: string;
          description_bn?: string | null;
          short_description: string;
          short_description_bn?: string | null;
          price_range?: string | null;
          duration?: string | null;
          image_url?: string | null;
          benefits?: Json;
          procedure_steps?: Json;
          is_featured?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          title_bn?: string | null;
          slug?: string;
          category?: string;
          description?: string;
          description_bn?: string | null;
          short_description?: string;
          short_description_bn?: string | null;
          price_range?: string | null;
          duration?: string | null;
          image_url?: string | null;
          benefits?: Json;
          procedure_steps?: Json;
          is_featured?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          patient_id: string | null;
          patient_name: string | null;
          patient_email: string | null;
          patient_phone: string | null;
          service_id: string | null;
          appointment_date: string;
          appointment_time: string;
          status: string;
          notes: string | null;
          is_emergency: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_id?: string | null;
          patient_name?: string | null;
          patient_email?: string | null;
          patient_phone?: string | null;
          service_id?: string | null;
          appointment_date: string;
          appointment_time: string;
          status?: string;
          notes?: string | null;
          is_emergency?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string | null;
          patient_name?: string | null;
          patient_email?: string | null;
          patient_phone?: string | null;
          service_id?: string | null;
          appointment_date?: string;
          appointment_time?: string;
          status?: string;
          notes?: string | null;
          is_emergency?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          title_bn: string | null;
          slug: string;
          excerpt: string;
          excerpt_bn: string | null;
          content: string;
          content_bn: string | null;
          author: string;
          category: string;
          featured_image: string | null;
          tags: Json;
          published: boolean;
          views: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          title_bn?: string | null;
          slug: string;
          excerpt: string;
          excerpt_bn?: string | null;
          content: string;
          content_bn?: string | null;
          author?: string;
          category: string;
          featured_image?: string | null;
          tags?: Json;
          published?: boolean;
          views?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          title_bn?: string | null;
          slug?: string;
          excerpt?: string;
          excerpt_bn?: string | null;
          content?: string;
          content_bn?: string | null;
          author?: string;
          category?: string;
          featured_image?: string | null;
          tags?: Json;
          published?: boolean;
          views?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          patient_name: string;
          patient_name_bn: string | null;
          treatment: string;
          rating: number;
          comment: string;
          comment_bn: string | null;
          image_url: string | null;
          is_featured: boolean;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          patient_name: string;
          patient_name_bn?: string | null;
          treatment: string;
          rating: number;
          comment: string;
          comment_bn?: string | null;
          image_url?: string | null;
          is_featured?: boolean;
          approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          patient_name?: string;
          patient_name_bn?: string | null;
          treatment?: string;
          rating?: number;
          comment?: string;
          comment_bn?: string | null;
          image_url?: string | null;
          is_featured?: boolean;
          approved?: boolean;
          created_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string;
          message?: string;
          status?: string;
          created_at?: string;
        };
      };
      gallery_images: {
        Row: {
          id: string;
          title: string;
          title_bn: string | null;
          category: string;
          image_url: string | null;
          before_image_url: string | null;
          after_image_url: string | null;
          description: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          title_bn?: string | null;
          category: string;
          image_url?: string | null;
          before_image_url?: string | null;
          after_image_url?: string | null;
          description?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          title_bn?: string | null;
          category?: string;
          image_url?: string | null;
          before_image_url?: string | null;
          after_image_url?: string | null;
          description?: string | null;
          display_order?: number;
          created_at?: string;
        };
      };
    };
  };
}
