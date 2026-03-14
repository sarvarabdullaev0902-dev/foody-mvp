'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirm: '',
  });

  const inputCls =
    'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAD6CC] via-white to-[#F5ECDE] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#E8594F] font-bold text-2xl">
            <Leaf className="w-7 h-7" />
            <span>Foody</span>
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-slate-800">{t('register_title')}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder={t('full_name')}
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className={inputCls}
              autoComplete="name"
            />
            <input
              type="tel"
              placeholder={t('phone')}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputCls}
              autoComplete="tel"
            />
            <input
              type="email"
              placeholder={t('email')}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputCls}
              autoComplete="email"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('password')}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`${inputCls} pr-11`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder={t('confirm_password')}
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className={`${inputCls} pr-11`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3 rounded-xl transition-colors shadow-sm mt-1"
            >
              {t('register_btn')}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            {t('have_account')}{' '}
            <Link href="/auth/login" className="text-emerald-600 font-semibold hover:underline">
              {t('login_link')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
