import dummyData from "../data/dummy-data.json";

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role: "doctor" | "patient" | "admin";
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  title_bn?: string;
  slug: string;
  category: string;
  description: string;
  short_description: string;
  price_range?: string;
  duration?: string;
  image_url?: string;
  benefits?: string[];
  procedure_steps?: string[];
  is_featured?: boolean;
  display_order?: number;
  created_at?: string;
}

export interface Appointment {
  id: string;
  patient_id?: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  service_id?: string;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
  is_emergency?: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  patient_name: string;
  treatment: string;
  rating: number;
  comment: string;
  image_url?: string;
  is_featured?: boolean;
  approved?: boolean;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  featured_image?: string;
  tags?: string[];
  published?: boolean;
  views?: number;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: "before_after" | "clinic_tour" | "team";
  image_url?: string;
  before_image_url?: string;
  after_image_url?: string;
  description?: string;
  display_order?: number;
  created_at?: string;
}

class InMemoryDatabase {
  private data: typeof dummyData;

  constructor() {
    this.data = JSON.parse(JSON.stringify(dummyData));
  }

  // User methods
  getUserByEmail(email: string): User | undefined {
    return this.data.users.find((u) => u.email === email);
  }

  getUserById(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  getAllUsers(): User[] {
    return this.data.users;
  }

  createUser(
    user: Partial<User> & { email: string; password: string; fullName: string }
  ): User {
    const id = "user-" + Date.now();
    const newUser: User = {
      id,
      email: user.email,
      password: user.password,
      fullName: user.fullName,
      phone: (user.phone as string) || "",
      role: (user.role as any) || "patient",
      createdAt: new Date().toISOString(),
    };
    this.data.users.push(newUser);
    return newUser;
  }

  deleteUser(id: string): boolean {
    const index = this.data.users.findIndex((u) => u.id === id);
    if (index > -1) {
      this.data.users.splice(index, 1);
      return true;
    }
    return false;
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.data.users.find((u) => u.id === id);
    if (user) {
      Object.assign(user, updates);
    }
    return user;
  }

  // Service methods
  getAllServices(): Service[] {
    return this.data.services;
  }

  getFeaturedServices(): Service[] {
    return this.data.services.filter((s) => s.is_featured);
  }

  getServiceBySlug(slug: string): Service | undefined {
    return this.data.services.find((s) => s.slug === slug);
  }

  getServiceById(id: string): Service | undefined {
    return this.data.services.find((s) => s.id === id);
  }

  createService(service: Service): Service {
    this.data.services.push(service);
    return service;
  }

  updateService(id: string, updates: Partial<Service>): Service | undefined {
    const service = this.data.services.find((s) => s.id === id);
    if (service) {
      Object.assign(service, updates);
    }
    return service;
  }

  deleteService(id: string): boolean {
    const index = this.data.services.findIndex((s) => s.id === id);
    if (index > -1) {
      this.data.services.splice(index, 1);
      return true;
    }
    return false;
  }

  // Appointment methods
  getAllAppointments(): Appointment[] {
    return this.data.appointments;
  }

  getAppointmentsByPatientId(patientId: string): Appointment[] {
    return this.data.appointments.filter((a) => a.patient_id === patientId);
  }

  getAppointmentById(id: string): Appointment | undefined {
    return this.data.appointments.find((a) => a.id === id);
  }

  createAppointment(appointment: Appointment): Appointment {
    const id = "apt-" + Date.now();
    const newAppointment = {
      ...appointment,
      id,
      created_at: new Date().toISOString(),
    };
    this.data.appointments.push(newAppointment);
    return newAppointment;
  }

  updateAppointment(
    id: string,
    updates: Partial<Appointment>
  ): Appointment | undefined {
    const appointment = this.data.appointments.find((a) => a.id === id);
    if (appointment) {
      Object.assign(appointment, updates);
    }
    return appointment;
  }

  deleteAppointment(id: string): boolean {
    const index = this.data.appointments.findIndex((a) => a.id === id);
    if (index > -1) {
      this.data.appointments.splice(index, 1);
      return true;
    }
    return false;
  }

  // Testimonial methods
  getAllTestimonials(): Testimonial[] {
    return this.data.testimonials;
  }

  getFeaturedTestimonials(): Testimonial[] {
    return this.data.testimonials.filter((t) => t.is_featured && t.approved);
  }

  getTestimonialById(id: string): Testimonial | undefined {
    return this.data.testimonials.find((t) => t.id === id);
  }

  createTestimonial(testimonial: Testimonial): Testimonial {
    const id = "testi-" + Date.now();
    const newTestimonial = {
      ...testimonial,
      id,
      created_at: new Date().toISOString(),
    };
    this.data.testimonials.push(newTestimonial);
    return newTestimonial;
  }

  updateTestimonial(
    id: string,
    updates: Partial<Testimonial>
  ): Testimonial | undefined {
    const testimonial = this.data.testimonials.find((t) => t.id === id);
    if (testimonial) {
      Object.assign(testimonial, updates);
    }
    return testimonial;
  }

  // Blog methods
  getAllBlogPosts(): BlogPost[] {
    return this.data.blog_posts;
  }

  getPublishedBlogPosts(): BlogPost[] {
    return this.data.blog_posts.filter((b) => b.published);
  }

  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this.data.blog_posts.find((b) => b.slug === slug);
  }

  getBlogPostById(id: string): BlogPost | undefined {
    return this.data.blog_posts.find((b) => b.id === id);
  }

  createBlogPost(post: BlogPost): BlogPost {
    const id = "blog-" + Date.now();
    const newPost = {
      ...post,
      id,
      created_at: new Date().toISOString(),
    };
    this.data.blog_posts.push(newPost);
    return newPost;
  }

  updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | undefined {
    const post = this.data.blog_posts.find((b) => b.id === id);
    if (post) {
      Object.assign(post, updates);
    }
    return post;
  }

  deleteBlogPost(id: string): boolean {
    const index = this.data.blog_posts.findIndex((b) => b.id === id);
    if (index > -1) {
      this.data.blog_posts.splice(index, 1);
      return true;
    }
    return false;
  }

  // Contact message methods
  getAllContactMessages(): ContactMessage[] {
    return this.data.contact_messages;
  }

  getContactMessageById(id: string): ContactMessage | undefined {
    return this.data.contact_messages.find((m) => m.id === id);
  }

  createContactMessage(message: ContactMessage): ContactMessage {
    const id = "msg-" + Date.now();
    const newMessage = {
      ...message,
      id,
      created_at: new Date().toISOString(),
    };
    this.data.contact_messages.push(newMessage);
    return newMessage;
  }

  updateContactMessage(
    id: string,
    updates: Partial<ContactMessage>
  ): ContactMessage | undefined {
    const message = this.data.contact_messages.find((m) => m.id === id);
    if (message) {
      Object.assign(message, updates);
    }
    return message;
  }

  // Gallery methods
  getAllGalleryImages(): GalleryImage[] {
    return this.data.gallery_images;
  }

  getGalleryImagesByCategory(category: string): GalleryImage[] {
    return this.data.gallery_images.filter((g) => g.category === category);
  }

  // Password reset methods
  createPasswordResetToken(email: string): string {
    const token = Math.random().toString(36).substring(2, 15);
    const resetRecord = {
      email,
      token,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    };
    this.data.password_resets.push(resetRecord);
    return token;
  }

  verifyPasswordResetToken(email: string, token: string): boolean {
    const record = this.data.password_resets.find(
      (r) =>
        r.email === email &&
        r.token === token &&
        new Date(r.expiresAt) > new Date()
    );
    return !!record;
  }

  removePasswordResetToken(email: string, token: string): void {
    const index = this.data.password_resets.findIndex(
      (r) => r.email === email && r.token === token
    );
    if (index > -1) {
      this.data.password_resets.splice(index, 1);
    }
  }
}

export const db = new InMemoryDatabase();
