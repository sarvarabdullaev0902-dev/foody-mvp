'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingCart, ArrowRight, Plus, Minus } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import { useCart } from '@/lib/cart-context';

const SERVICE_FEE = 1000;

export default function CartPage() {
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const { items, removeFromCart, updateQty } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + (items.length > 0 ? SERVICE_FEE : 0);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F5ECDE]">
        <Navbar />

        <div className="max-w-5xl mx-auto px-4 py-8">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold text-slate-900 mb-2"
          >
            {t('title')}
          </motion.h1>
          {items.length > 0 && (
            <p className="text-sm text-slate-500 mb-6">{t('items_count', { count: items.length })}</p>
          )}

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-4">
                <ShoppingCart className="w-9 h-9 text-slate-300" />
              </div>
              <h2 className="text-lg font-bold text-slate-700 mb-1">{t('empty_title')}</h2>
              <p className="text-sm text-slate-400 mb-6">{t('empty_subtitle')}</p>
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm"
              >
                {t('browse_deals')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Items list */}
              <div className="lg:col-span-2 space-y-3">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex"
                    >
                      <div className="relative shrink-0 w-28 sm:w-36">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                          -{item.discount}%
                        </span>
                      </div>

                      <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-0.5 truncate">
                              {item.supplier}
                            </p>
                            <h3 className="text-sm font-bold text-slate-800 leading-snug">
                              {item.title}
                            </h3>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="shrink-0 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label={t('remove')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              disabled={item.qty === 1}
                              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-emerald-400 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold text-slate-800">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              disabled={item.qty === 10}
                              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-emerald-400 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-base font-extrabold text-emerald-600">
                              {(item.price * item.qty).toLocaleString()} {tCommon('currency')}
                            </p>
                            <p className="text-xs text-slate-400">
                              {item.price.toLocaleString()} {tCommon('currency')} × {item.qty}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Summary sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                  <h2 className="font-bold text-slate-900 text-base">{t('subtotal')}</h2>

                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs text-slate-500">
                        <span className="truncate max-w-[140px]">{item.title} ×{item.qty}</span>
                        <span className="font-medium text-slate-700 shrink-0 ml-2">
                          {(item.price * item.qty).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>{t('subtotal')}</span>
                      <span className="font-semibold">{subtotal.toLocaleString()} {tCommon('currency')}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>{t('service_fee')}</span>
                      <span>{SERVICE_FEE.toLocaleString()} {tCommon('currency')}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{t('total')}</span>
                    <span className="text-xl font-extrabold text-emerald-600">
                      {total.toLocaleString()} {tCommon('currency')}
                    </span>
                  </div>

                  <button
                    onClick={() => router.push('/auth/login?redirect=/cart')}
                    className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl text-sm text-center transition-colors shadow-sm hover:shadow-md"
                  >
                    {t('place_order')} →
                  </button>

                  <Link
                    href="/browse"
                    className="block text-center text-xs text-slate-400 hover:text-emerald-600 transition-colors font-medium"
                  >
                    {t('browse_deals')}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
