'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Leaf, Eye, EyeOff, Store } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth-context';

export default function SupplierLoginPage() {
  const t = useTranslations('supplier_auth');
  const { loginSupplier } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: 'demo@foody.uz', password: 'demo123' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginSupplier(form.email, form.password);
    if (ok) {
      router.push('/supplier/dashboard');
    } else {
      setError(t('error_invalid'));
    }
  };

  const inputCls =
    'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8594F] focus:border-transparent transition';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAD6CC] via-white to-[#F5ECDE] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#E8594F] font-bold text-2xl">
            <Leaf className="w-7 h-7" />
            <span>Foody</span>
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FAD6CC] border border-[#F9C0B8]">
              <Store className="w-5 h-5 text-[#E8594F]" />
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold text-[#1E1E1E]">{t('login_title')}</h1>
          <p className="mt-1 text-sm text-[#4B5563]">{t('login_subtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-[#F9C0B8] p-8">
          {/* Demo hint */}
          <div className="mb-4 px-4 py-2.5 rounded-xl bg-[#FAD6CC] border border-[#F9C0B8] text-[#E8594F] text-sm text-center font-medium">
            {t('demo_hint')}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder={t('email')}
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setError(''); }}
              className={inputCls}
              autoComplete="email"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('password')}
                value={form.password}
                onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(''); }}
                className={`${inputCls} pr-11`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center -mt-1">{error}</p>
            )}

            <div className="text-right -mt-1">
              <button type="button" className="text-sm text-[#E8594F] hover:underline font-medium">
                {t('forgot_password')}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E8594F] hover:bg-[#D14840] active:bg-[#C03C35] text-white font-bold py-3 rounded-xl transition-colors shadow-sm"
            >
              {t('login_btn')}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            {t('no_account')}{' '}
            <Link href="/supplier/register" className="text-[#E8594F] font-semibold hover:underline">
              {t('register_link')}
            </Link>
          </p>
        </div>

        {/* Back to customer site */}
        <p className="text-center mt-6">
          <Link href="/" className="text-sm text-slate-500 hover:text-[#E8594F] transition-colors">
            ← Asosiy saytga qaytish
          </Link>
        </p>
      </div>
    </div>
  );
}
