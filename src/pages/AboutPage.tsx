import { Award, GraduationCap, Heart, Target, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: t('Patient-Centered Care', 'রোগী-কেন্দ্রিক যত্ন'),
      description: t('We put your comfort and well-being first', 'আমরা আপনার আরাম এবং সুস্থতা প্রথমে রাখি'),
    },
    {
      icon: Award,
      title: t('Excellence', 'শ্রেষ্ঠত্ব'),
      description: t('Committed to the highest quality care', 'সর্বোচ্চ মানের যত্নে প্রতিশ্রুতিবদ্ধ'),
    },
    {
      icon: Users,
      title: t('Community Focus', 'সম্প্রদায় ফোকাস'),
      description: t('Dedicated to improving oral health', 'মুখের স্বাস্থ্য উন্নতিতে নিবেদিত'),
    },
    {
      icon: Target,
      title: t('Continuous Learning', 'ক্রমাগত শেখা'),
      description: t('Always updating our skills', 'সবসময় আমাদের দক্ষতা আপডেট করা'),
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('About Dentist Bari', 'ডেন্টিস্ট বাড়ি সম্পর্কে')}
          </h1>
          <p className="text-xl text-blue-100">
            {t('Providing exceptional dental care since 2012', '২০১২ সাল থেকে ব্যতিক্রমী দন্ত চিকিৎসা প্রদান')}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Dr. Md. Ripon Ali"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('Meet Dr. Md. Ripon Ali', 'ডাঃ মোঃ রিপন আলীর সাথে দেখা করুন')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t(
                  'Dr. Ripon Ali is a highly skilled dentist with over 15 years of experience. He graduated from Dhaka Dental College with a BDS degree and has dedicated his career to providing excellent dental care.',
                  'ডাঃ রিপন আলী একজন অত্যন্ত দক্ষ দন্ত চিকিৎসক যার ১৫ বছরেরও বেশি অভিজ্ঞতা রয়েছে। তিনি ঢাকা ডেন্টাল কলেজ থেকে বিডিএস ডিগ্রি নিয়ে স্নাতক হয়েছেন।'
                )}
              </p>
              <button
                onClick={() => onNavigate('book-appointment')}
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition font-semibold"
              >
                {t('Book Appointment', 'অ্যাপয়েন্টমেন্ট বুক করুন')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            {t('Our Values', 'আমাদের মূল্যবোধ')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('Ready for Quality Care?', 'মানসম্পন্ন যত্নের জন্য প্রস্তুত?')}
          </h2>
          <button
            onClick={() => onNavigate('book-appointment')}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            {t('Book Your Appointment', 'আপনার অ্যাপয়েন্টমেন্ট বুক করুন')}
          </button>
        </div>
      </section>
    </div>
  );
}
