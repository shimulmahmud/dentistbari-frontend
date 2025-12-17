import { useState, useEffect } from 'react';
import { Award, Users, Clock, Star, ChevronRight, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: servicesData } = await supabase
      .from('services')
      .select('*')
      .eq('is_featured', true)
      .order('display_order')
      .limit(3);

    const { data: testimonialsData } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .eq('approved', true)
      .limit(2);

    if (servicesData) setServices(servicesData);
    if (testimonialsData) setTestimonials(testimonialsData);
  };

  const features = [
    {
      icon: Award,
      title: t('Expert Care', 'বিশেষজ্ঞ যত্ন'),
      description: t('BDS qualified dentist with years of experience', 'বছরের অভিজ্ঞতা সহ বিডিএস যোগ্য দন্ত চিকিৎসক'),
    },
    {
      icon: Users,
      title: t('Patient-Centered', 'রোগী-কেন্দ্রিক'),
      description: t('Your comfort and satisfaction is our priority', 'আপনার আরাম এবং সন্তুষ্টি আমাদের অগ্রাধিকার'),
    },
    {
      icon: Clock,
      title: t('Flexible Hours', 'নমনীয় সময়'),
      description: t('Evening and weekend appointments available', 'সন্ধ্যা এবং সাপ্তাহিক ছুটির দিন উপলব্ধ'),
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('Your Smile, Our Priority', 'আপনার হাসি, আমাদের অগ্রাধিকার')}
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                {t('Experience exceptional dental care from Dr. Md. Ripon Ali, BDS', 'ডাঃ মোঃ রিপন আলী, বিডিএস থেকে ব্যতিক্রমী দন্ত চিকিৎসা অনুভব করুন')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('book-appointment')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition flex items-center justify-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  {t('Book Appointment', 'অ্যাপয়েন্টমেন্ট বুক করুন')}
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition"
                >
                  {t('Our Services', 'আমাদের সেবা')}
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Dental Care"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('Why Choose Dentist Bari?', 'কেন ডেন্টিস্ট বাড়ি বেছে নেবেন?')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('Our Services', 'আমাদের সেবাসমূহ')}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
                  {service.image_url && (
                    <img src={service.image_url} alt={service.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.short_description}</p>
                    <button className="text-blue-600 font-medium flex items-center">
                      {t('Learn More', 'আরও জানুন')}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('What Our Patients Say', 'আমাদের রোগীরা কি বলেন')}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white text-gray-900 p-6 rounded-xl">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <div className="font-semibold">{testimonial.patient_name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('Ready to Transform Your Smile?', 'আপনার হাসি পরিবর্তন করতে প্রস্তুত?')}
          </h2>
          <button
            onClick={() => onNavigate('book-appointment')}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            {t('Book Your Appointment Now', 'এখনই আপনার অ্যাপয়েন্টমেন্ট বুক করুন')}
          </button>
        </div>
      </section>
    </div>
  );
}
