'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Leaf, Phone, Mail, MapPin, Clock } from 'lucide-react';

const SOCIAL = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/foody.uz',
    color: '#E4405F',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/foody_uz',
    color: '#26A5E4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@foody.uz',
    color: '#EE1D52',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.78 1.52V6.87a4.85 4.85 0 01-1.01-.18z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/foody.uz',
    color: '#1877F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@foody_uz',
    color: '#FF0000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/foody_uz',
    color: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#1E1E1E] text-gray-400 pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Col 1 – Brand */}
          <div>
            <p className="text-white font-bold text-xl flex items-center gap-2 mb-3">
              <Leaf className="w-5 h-5 text-[#E8594F]" /> Foody Moody
            </p>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
          </div>

          {/* Col 2 – Quick links */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t('quick_links')}
            </p>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link href="/about" className="hover:text-white transition-colors">{t('about')}</Link>
              <Link href="/app-info" className="hover:text-white transition-colors">{t('how_it_works')}</Link>
              <Link href="/business" className="hover:text-white transition-colors">{t('for_suppliers')}</Link>
              <Link href="/contact" className="hover:text-white transition-colors">{t('contact')}</Link>
            </nav>
          </div>

          {/* Col 3 – Contact info */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t('contact_us')}
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="tel:+998711234567" className="flex items-center gap-2.5 hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-[#E8594F] shrink-0" />
                +998 71 123 45 67
              </a>
              <a href="mailto:info@foody.uz" className="flex items-center gap-2.5 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-[#E8594F] shrink-0" />
                info@foody.uz
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8594F] shrink-0" />
                {t('address')}
              </span>
              <span className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E8594F] shrink-0" />
                {t('working_hours')}
              </span>
            </div>
          </div>
        </div>

        {/* Social media row */}
        <div className="border-t border-gray-800 pt-8 mb-6">
          <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider text-center">
            {t('follow_us')}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {SOCIAL.map(({ name, href, color, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 transition-all duration-200 hover:scale-110"
                style={{ ['--brand' as string]: color }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = color;
                  (e.currentTarget as HTMLElement).style.backgroundColor = color + '22';
                  (e.currentTarget as HTMLElement).style.borderColor = color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '';
                  (e.currentTarget as HTMLElement).style.backgroundColor = '';
                  (e.currentTarget as HTMLElement).style.borderColor = '';
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-5 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Foody Moody. {t('rights')}
          <p className="mt-1.5 text-[11px] text-gray-700">
            {t('founders')}
          </p>
        </div>
      </div>
    </footer>
  );
}
