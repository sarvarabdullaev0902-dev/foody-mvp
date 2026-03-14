'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { Leaf, Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { motion, useAnimationControls } from 'framer-motion';

function CartIcon({ label, itemCount }: { label: string; itemCount: number }) {
  const { lastAddedAt } = useCart();
  const controls = useAnimationControls();

  useEffect(() => {
    if (lastAddedAt > 0) {
      controls.start({
        scale: [1, 1.45, 0.85, 1.15, 1],
        transition: { duration: 0.45, ease: 'easeOut' },
      });
    }
  }, [lastAddedAt, controls]);

  return (
    <Link href="/cart" aria-label={label} className="relative p-2 text-slate-500 hover:text-emerald-600 transition-colors">
      <motion.div animate={controls}>
        <ShoppingCart className="w-5 h-5" />
      </motion.div>
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center leading-none">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { customerUser, hydrated, logoutCustomer } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logoutCustomer();
    setMenuOpen(false);
    router.push('/');
  };

  const navLinks = [
    { href: '/app-info' as const, label: t('app') },
    { href: '/business' as const, label: t('business') },
    { href: '/about' as const, label: t('about') },
    { href: '/food-waste' as const, label: t('food_waste') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top utility strip — language switcher + store login */}
      <div className="border-b border-gray-100 bg-gray-50/60 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-end gap-4">
          <Link
            href="/supplier/login"
            className="text-xs text-gray-500 hover:text-emerald-600 transition-colors font-medium"
          >
            {t('supplier_login')}
          </Link>
          <span className="text-gray-300">|</span>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-emerald-600 text-lg shrink-0">
          <Leaf className="w-5 h-5" />
          <span className="tracking-tight">Foody</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600 flex-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <CartIcon label={t('cart')} itemCount={itemCount} />
          {hydrated && customerUser ? (
            <>
              <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 whitespace-nowrap">
                <User className="w-4 h-4" />
                {customerUser.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors whitespace-nowrap"
              >
                <LogOut className="w-4 h-4" />
                {t('logout')}
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              <User className="w-4 h-4" />
              <span>{t('login')}</span>
            </Link>
          )}
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-md whitespace-nowrap">
            {t('download')}
          </button>
          <Link
            href="/supplier/register"
            className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-sm font-semibold px-5 py-2.5 rounded-full transition-all whitespace-nowrap"
          >
            {t('supplier_register')}
          </Link>
        </div>

        {/* Mobile: language switcher + cart + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <CartIcon label={t('cart')} itemCount={itemCount} />
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 text-slate-600 hover:text-emerald-600 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors py-1"
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
            {hydrated && customerUser ? (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 px-1">
                  <User className="w-4 h-4" />
                  {customerUser.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 text-sm font-semibold px-5 py-3 rounded-full text-center transition-all hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-700 text-sm font-semibold px-5 py-3 rounded-full text-center transition-all hover:bg-slate-50"
                >
                  <User className="w-4 h-4" />
                  {t('login')}
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-3 rounded-full text-center transition-all"
                >
                  {t('register')}
                </Link>
              </>
            )}
            <button className="w-full border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-sm font-semibold px-5 py-3 rounded-full transition-all">
              {t('download')}
            </button>
            <Link
              href="/supplier/register"
              onClick={() => setMenuOpen(false)}
              className="w-full border border-slate-200 text-slate-500 text-xs font-medium px-5 py-2.5 rounded-full text-center transition-all hover:bg-slate-50"
            >
              {t('supplier_register')}
            </Link>
            <Link
              href="/supplier/login"
              onClick={() => setMenuOpen(false)}
              className="text-xs text-center text-gray-400 hover:text-emerald-600 transition-colors font-medium"
            >
              {t('supplier_login')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
