import { CheckCircle, Stethoscope } from "lucide-react";

interface WhatToExpectProps {
  t: (key: string, fallback?: string) => string;
}

export const WhatToExpect = ({ t }: WhatToExpectProps) => (
  <div className="lg:col-span-1">
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center">
        <Stethoscope className="h-5 w-5 mr-2 text-teal-400" />
        {t("What to Expect", "কী আশা করবেন")}
      </h2>

      <ul className="space-y-4 text-gray-300">
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
          <span>
            {t("Comprehensive dental examination", "ব্যাপক দন্ত পরীক্ষণ")}
          </span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
          <span>
            {t("Personalized treatment plan", "ব্যক্তিগতকৃত চিকিৎসা পরিকল্পনা")}
          </span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
          <span>
            {t(
              "Comfortable and modern facility",
              "আরামদায়ক এবং আধুনিক সুবিধা"
            )}
          </span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
          <span>
            {t("Transparent pricing and options", "স্বচ্ছ মূল্য এবং বিকল্প")}
          </span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-4 w-4 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
          <span>
            {t("Follow-up care and support", "অনুসরণ যত্ন এবং সমর্থন")}
          </span>
        </li>
      </ul>
    </div>
  </div>
);
