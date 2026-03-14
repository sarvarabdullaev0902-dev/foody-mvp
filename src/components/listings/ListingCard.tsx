'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Minus, Plus } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Listing } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { useToast } from '@/components/ui/useToast';
import Toast from '@/components/ui/Toast';

type Props = {
  listing: Listing;
  view?: 'grid' | 'list';
  index?: number;
};

export default function ListingCard({ listing, view = 'grid', index = 0 }: Props) {
  const t = useTranslations('listing');
  const tBtn = useTranslations('buttons');
  const tCommon = useTranslations('common');
  const { items, addToCart, removeFromCart, updateQty } = useCart();
  const { visible, show } = useToast();
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = items.find((i) => i.id === listing.id);
  const qty = cartItem?.qty ?? 0;

  function handleReserve(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(listing);
    show();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  function handleMinus(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (qty <= 1) removeFromCart(listing.id);
    else updateQty(listing.id, -1);
  }

  function handlePlus(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    updateQty(listing.id, 1);
  }

  const actionButton = (
    <AnimatePresence mode="wait">
      {justAdded ? (
        <motion.button
          key="added"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="block w-full bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm shadow-sm text-center cursor-default"
        >
          {tBtn('added')}
        </motion.button>
      ) : qty > 0 ? (
        <motion.div
          key="qty"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl overflow-hidden"
        >
          <button
            onClick={handleMinus}
            className="flex items-center justify-center w-11 py-3 text-slate-600 hover:bg-red-50 hover:text-red-500 active:bg-red-100 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <AnimatePresence mode="wait">
            <motion.span
              key={qty}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="text-sm font-bold text-slate-800 min-w-[2ch] text-center"
            >
              {qty}
            </motion.span>
          </AnimatePresence>
          <button
            onClick={handlePlus}
            className="flex items-center justify-center w-11 py-3 text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        <motion.button
          key="reserve"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.8 }}
          onClick={handleReserve}
          className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-sm text-center"
        >
          {tBtn('reserve')}
        </motion.button>
      )}
    </AnimatePresence>
  );

  if (view === 'list') {
    return (
      <>
        <Toast message={tCommon('added_to_cart')} visible={visible} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.01 }}
        >
          <Link
            href={`/listing/${listing.id}`}
            className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex"
          >
            <div className="relative shrink-0 w-36 sm:w-48 overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-extrabold px-2 py-0.5 rounded-full shadow">
                -{listing.discount}%
              </span>
              <AnimatePresence>
                {qty > 1 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-extrabold px-1.5 py-0.5 rounded-full shadow z-10 min-w-[1.5rem] text-center"
                  >
                    ×{qty}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
              <div>
                <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-0.5">
                  {listing.supplier}
                </p>
                <h3 className="text-sm font-bold text-slate-800 leading-snug truncate">
                  {listing.title}
                </h3>
              </div>
              <div className="mt-2">
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-lg font-extrabold text-emerald-600">
                    {listing.discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{tCommon('currency')}</span>
                  <span className="text-xs text-slate-400 line-through ml-1">
                    {listing.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1 shrink-0"><Clock className="w-3 h-3" />{t('expires_in')} {listing.expiresIn}</span>
                  <span className="flex items-center gap-1 min-w-0 truncate"><MapPin className="w-3 h-3 shrink-0" />{listing.pickup}</span>
                </div>
                {actionButton}
              </div>
            </div>
          </Link>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Toast message={tCommon('added_to_cart')} visible={visible} />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.02, y: -4 }}
      >
        <Link
          href={`/listing/${listing.id}`}
          className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow overflow-hidden block"
        >
          <div className="relative overflow-hidden">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow">
              -{listing.discount}%
            </span>
            <AnimatePresence>
              {qty > 1 ? (
                <motion.span
                  key="qty-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-extrabold px-2 py-0.5 rounded-full shadow z-10 min-w-[1.5rem] text-center"
                >
                  ×{qty}
                </motion.span>
              ) : (
                <span key="expiry-badge" className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" />{listing.expiresIn}
                </span>
              )}
            </AnimatePresence>
          </div>
          <div className="p-4">
            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-1">
              {listing.supplier}
            </p>
            <h3 className="text-base font-bold text-slate-800 mb-3 leading-snug">{listing.title}</h3>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-extrabold text-emerald-600">
                {listing.discountedPrice.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-slate-400">{tCommon('currency')}</span>
              <span className="text-sm text-slate-400 line-through ml-auto">
                {listing.originalPrice.toLocaleString()} {tCommon('currency')}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 bg-slate-50 rounded-xl px-3 py-2 mb-4">
              <span className="flex items-center gap-1 shrink-0"><Clock className="w-3 h-3" />{t('expires_in')}: {listing.expiresIn}</span>
              <span className="flex items-center gap-1 min-w-0 truncate"><MapPin className="w-3 h-3 shrink-0" />{listing.pickup}</span>
            </div>
            {actionButton}
          </div>
        </Link>
      </motion.div>
    </>
  );
}
