'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Clock, Store } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';

// Fixed demo order details
const ORDER_DETAIL = {
  supplier: 'Salom Bakery',
  address: "Amir Temur ko'chasi 15, Yunusobod tumani, Toshkent",
  pickupWindow: '17:00–19:00',
  lat: 41.3295,
  lon: 69.2901,
};

export default function OrderConfirmationPage() {
  const t = useTranslations('order_confirmation');

  const [orderNumber] = useState(() => String(Math.floor(100000 + Math.random() * 900000)));
  const [pickupCode] = useState(() => String(Math.floor(1000 + Math.random() * 9000)));

  const delta = 0.015;
  const osmBbox = `${ORDER_DETAIL.lon - delta}%2C${ORDER_DETAIL.lat - delta * 0.6}%2C${ORDER_DETAIL.lon + delta}%2C${ORDER_DETAIL.lat + delta * 0.6}`;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F5ECDE]">
        <Navbar />

        <div className="max-w-lg mx-auto px-4 py-12">
          {/* Success checkmark */}
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
              className="w-20 h-20 bg-[#E8F5EE] rounded-full flex items-center justify-center mb-5"
            >
              <CheckCircle className="w-10 h-10 text-[#1B7A4A]" strokeWidth={2} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-2xl font-extrabold text-slate-900 mb-1"
            >
              {t('title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="text-sm text-slate-500"
            >
              {t('subtitle')}
            </motion.p>
          </div>

          {/* Order number */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.4 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-4 flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{t('order_number')}</p>
              <p className="text-lg font-extrabold text-slate-900 mt-0.5">#{orderNumber}</p>
            </div>
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl">
              🧾
            </div>
          </motion.div>

          {/* Pickup code — prominent */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.4 }}
            className="bg-[#1B7A4A] rounded-2xl p-6 mb-4 text-center text-white"
          >
            <p className="text-sm font-semibold text-white/80 mb-2">{t('pickup_code')}</p>
            <div className="flex items-center justify-center gap-3 mb-3">
              {pickupCode.split('').map((digit, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.52 + i * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
                  className="w-14 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl font-extrabold tracking-widest"
                >
                  {digit}
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-white/70">{t('pickup_code_hint')}</p>
          </motion.div>

          {/* Pickup details */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-4 space-y-4"
          >
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">{t('pickup_details')}</h2>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FAD6CC] rounded-xl flex items-center justify-center shrink-0">
                <Store className="w-4 h-4 text-[#E8594F]" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">{t('supplier')}</p>
                <p className="text-sm font-semibold text-slate-800">{ORDER_DETAIL.supplier}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FAD6CC] rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#E8594F]" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">{t('address')}</p>
                <p className="text-sm font-semibold text-slate-800 leading-snug">{ORDER_DETAIL.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FAD6CC] rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#E8594F]" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">{t('pickup_window')}</p>
                <p className="text-xl font-extrabold text-slate-900">{ORDER_DETAIL.pickupWindow}</p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.4 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6"
          >
            <div className="h-44 relative">
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${osmBbox}&layer=mapnik`}
                className="absolute inset-0 w-full h-full border-0"
                style={{ pointerEvents: 'none' }}
                title="Pickup location"
              />
              {/* Center pin */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center -translate-y-3">
                  <div className="w-9 h-9 bg-[#1B7A4A] rounded-full border-2 border-white shadow-xl flex items-center justify-center text-white text-base">
                    🥐
                  </div>
                  <div className="w-2 h-2 bg-[#1B7A4A] rotate-45 -mt-1" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.4 }}
            className="flex flex-col gap-3"
          >
            <Link
              href="/"
              className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl text-sm text-center transition-colors shadow-sm"
            >
              {t('back_home')}
            </Link>
            <Link
              href="/browse"
              className="block w-full border-2 border-slate-200 hover:border-emerald-400 text-slate-600 hover:text-emerald-600 font-semibold py-3.5 rounded-2xl text-sm text-center transition-colors"
            >
              {t('browse_more')}
            </Link>
          </motion.div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
