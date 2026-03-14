import { useTranslations } from 'next-intl';
import { Leaf } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#1E1E1E] text-gray-400 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          <div>
            <p className="text-white font-bold text-xl flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#FF6B2C]" /> Foody
            </p>
            <p className="text-sm mt-1.5 text-gray-500 max-w-xs leading-relaxed">
              {t('tagline')}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[t('about'), t('how_it_works'), t('for_suppliers'), t('contact')].map((label) => (
              <a key={label} href="#" className="hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Foody. {t('rights')}
          <p className="mt-2 text-[11px] text-gray-700">
            {t('founders')}
          </p>
        </div>
      </div>
    </footer>
  );
}
