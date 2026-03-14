'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ListingCard from '@/components/listings/ListingCard';
import { DEMO_LISTINGS } from '@/lib/demo-listings';
import { useCart } from '@/lib/cart-context';
import { useToast } from '@/components/ui/useToast';
import Toast from '@/components/ui/Toast';

// Extended detail data keyed by listing id
const LISTING_DETAILS: Record<number, {
  address: string;
  workingHours: string;
  rating: number;
  reviewCount: number;
  lat: number;
  lon: number;
}> = {
  1: {
    address: 'Amir Temur ko\'chasi 15, Yunusobod tumani, Toshkent',
    workingHours: '07:00 – 21:00',
    rating: 4.7,
    reviewCount: 128,
    lat: 41.3295,
    lon: 69.2901,
  },
  2: {
    address: 'Yunusobod ko\'chasi 34, Yakkasaroy tumani, Toshkent',
    workingHours: '08:00 – 22:00',
    rating: 4.5,
    reviewCount: 89,
    lat: 41.2995,
    lon: 69.2401,
  },
  3: {
    address: 'Shota Rustaveli ko\'chasi 7, Mirzo Ulug\'bek tumani, Toshkent',
    workingHours: '11:00 – 23:00',
    rating: 4.8,
    reviewCount: 213,
    lat: 41.3095,
    lon: 69.2701,
  },
};

// Fallback detail for ids without specific data
const DEFAULT_DETAIL = {
  address: 'Toshkent shahri, O\'zbekiston',
  workingHours: '09:00 – 21:00',
  rating: 4.4,
  reviewCount: 56,
  lat: 41.2995,
  lon: 69.2401,
};

const CATEGORY_ICONS: Record<string, string> = {
  restaurant: '🍽️', bakery: '🥐', supermarket: '🛒',
  pharmacy: '💊', cafe: '☕', store: '🏪',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ListingDetailPage() {
  const t = useTranslations('listing_detail');
  const tCat = useTranslations('supplier.categories');
  const tCommon = useTranslations('common');

  const locale = useLocale();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { visible: toastVisible, show: showToast } = useToast();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/browse');
    }
  }

  // Use listing id=1 as demo
  const listing = DEMO_LISTINGS.find((l) => l.id === 1) ?? DEMO_LISTINGS[0];
  const detail = LISTING_DETAILS[listing.id] ?? DEFAULT_DETAIL;
  const savings = listing.originalPrice - listing.discountedPrice;

  // Related: same category, different id
  const related = DEMO_LISTINGS.filter(
    (l) => l.category === listing.category && l.id !== listing.id
  ).slice(0, 3);

  // OSM iframe bbox centered on supplier
  const delta = 0.015;
  const osmBbox = `${detail.lon - delta}%2C${detail.lat - delta * 0.6}%2C${detail.lon + delta}%2C${detail.lat + delta * 0.6}`;

  return (
    <div className="min-h-screen bg-[#F5ECDE]">
      <Toast message={tCommon('added_to_cart')} visible={toastVisible} />
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back link */}
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors mb-6 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t('back')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* LEFT column */}
          <div className="lg:col-span-3 space-y-6">

            {/* Product image */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-72 md:h-96 object-cover"
              />
              {/* Discount badge */}
              <span className="absolute top-4 left-4 bg-[#E8594F] text-white font-extrabold text-lg px-4 py-1.5 rounded-full shadow-lg">
                -{listing.discount}%
              </span>
              {/* Expiry pill */}
              <span className="absolute top-4 right-4 bg-black/60 text-white text-sm font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5">
                <span>⏰</span>
                <span>{t('expires_in')}: {listing.expiresIn}</span>
              </span>
            </div>

            {/* Title + description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-xs text-[#E8594F] font-bold uppercase tracking-widest mb-1">
                {CATEGORY_ICONS[listing.category]} {tCat(listing.category as Parameters<typeof tCat>[0])}
              </p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                {listing.title}
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed">{listing.descriptions[locale as 'uz' | 'ru' | 'en']}</p>
            </div>

            {/* Pickup window */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FAD6CC] rounded-2xl flex items-center justify-center text-2xl shrink-0">
                🕐
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{t('pickup_window')}</p>
                <p className="text-xl font-extrabold text-gray-900">{listing.pickup}</p>
              </div>
            </div>

            {/* Supplier info card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">{t('supplier')}</h2>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                  {CATEGORY_ICONS[listing.category]}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-base">{listing.supplier}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={detail.rating} />
                    <span className="text-sm font-semibold text-yellow-500">{detail.rating}</span>
                    <span className="text-xs text-gray-400">{t('reviews', { count: detail.reviewCount })}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-50">
                <div className="flex items-start gap-2.5">
                  <span className="text-base mt-0.5">📍</span>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{t('address')}</p>
                    <p className="text-xs text-gray-700 leading-snug">{detail.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-base mt-0.5">🕐</span>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{t('working_hours')}</p>
                    <p className="text-xs text-gray-700">{detail.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map preview */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="px-5 pt-5 pb-3">
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">{t('map_preview')}</h2>
              </div>
              <div className="h-48 relative">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${osmBbox}&layer=mapnik`}
                  className="absolute inset-0 w-full h-full border-0"
                  style={{ pointerEvents: 'none' }}
                  title="Supplier location"
                />
                {/* Center pin */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center -translate-y-3">
                    <div className="w-9 h-9 bg-[#E8594F] rounded-full border-3 border-white shadow-xl flex items-center justify-center text-white text-base">
                      {CATEGORY_ICONS[listing.category]}
                    </div>
                    <div className="w-2 h-2 bg-[#E8594F] rotate-45 -mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT column — sticky purchase panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">

              {/* Price card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{t('original_price')}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#E8594F]">
                      {listing.discountedPrice.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-gray-400">{tCommon('currency')}</span>
                  </div>
                  <p className="text-sm text-gray-400 line-through mt-0.5">
                    {listing.originalPrice.toLocaleString()} {tCommon('currency')}
                  </p>
                </div>

                {/* Savings badge */}
                <div className="bg-[#FAD6CC] border border-[#F9C0B8] rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#1E1E1E]">🍊 {t('you_save')}</span>
                  <span className="text-sm font-extrabold text-[#E8594F]">
                    {savings.toLocaleString()} {tCommon('currency')}
                  </span>
                </div>

                {/* Quantity selector */}
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">{t('quantity')}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 rounded-xl border-2 border-gray-200 text-gray-600 text-xl font-bold flex items-center justify-center hover:border-[#E8594F] hover:text-[#E8594F] transition-colors"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-lg font-extrabold text-gray-900">{qty}</span>
                    <button
                      onClick={() => setQty((q) => Math.min(10, q + 1))}
                      className="w-10 h-10 rounded-xl border-2 border-gray-200 text-gray-600 text-xl font-bold flex items-center justify-center hover:border-[#E8594F] hover:text-[#E8594F] transition-colors"
                    >
                      +
                    </button>
                    <span className="text-sm text-gray-400 ml-1">
                      × {listing.discountedPrice.toLocaleString()} = <strong className="text-gray-700">{(listing.discountedPrice * qty).toLocaleString()}</strong> {tCommon('currency')}
                    </span>
                  </div>
                </div>

                {/* Reserve button */}
                <button
                  onClick={() => { addToCart(listing); showToast(); }}
                  className="w-full bg-[#E8594F] hover:bg-[#D14840] active:bg-[#C03C35] text-white font-extrabold py-4 rounded-2xl text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  {t('reserve_now')} →
                </button>
                <p className="text-[11px] text-gray-400 text-center leading-snug">
                  {t('cancel_anytime_note')}
                </p>
              </div>

              {/* Expiry urgency */}
              <div className="bg-[#FAD6CC] border border-[#F9C0B8] rounded-2xl p-4 flex items-center gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="text-sm font-bold text-[#E8594F]">{t('expires_in')} {listing.expiresIn}</p>
                  <p className="text-xs text-[#D14840]">{t('hurry_limited_stock')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar deals */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">{t('similar_deals')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <ListingCard key={item.id} listing={item} view="grid" />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
