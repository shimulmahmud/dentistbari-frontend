import { useState, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { t } = useLanguage();
  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchQuery]);

  const loadServices = async () => {
    const { data } = await supabase.from('services').select('*').order('display_order');
    if (data) setServices(data);
  };

  const filterServices = () => {
    let filtered = services;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => s.title.toLowerCase().includes(query));
    }
    setFilteredServices(filtered);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('Our Dental Services', 'আমাদের দন্ত সেবা')}
          </h1>
          <p className="text-xl text-blue-100">
            {t('Comprehensive dental care for all your needs', 'আপনার সমস্ত চাহিদার জন্য ব্যাপক দন্ত চিকিৎসা')}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={t('Search services...', 'সেবা খুঁজুন...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t('No services found', 'কোন সেবা পাওয়া যায়নি')}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div key={service.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
                  {service.image_url && (
                    <img src={service.image_url} alt={service.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.short_description}</p>
                    {service.price_range && (
                      <p className="text-teal-600 font-semibold mb-4">{t('Starting from', 'শুরু হয়')} {service.price_range}</p>
                    )}
                    <button className="text-blue-600 font-medium flex items-center">
                      {t('Learn More', 'আরও জানুন')}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
