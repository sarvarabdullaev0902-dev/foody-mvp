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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 font-bold text-2xl">
            <Leaf className="w-7 h-7" />
            <span>Foody</span>
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <Store className="w-5 h-5 text-emerald-400" />
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold text-white">{t('login_title')}</h1>
          <p className="mt-1 text-sm text-slate-400">{t('login_subtitle')}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-8">
          {/* Demo hint */}
          <div className="mb-4 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm text-center font-medium">
            {t('demo_hint')}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder={t('email')}
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setError(''); }}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/10 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
              autoComplete="email"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('password')}
                value={form.password}
                onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(''); }}
                className="w-full px-4 py-3 pr-11 rounded-xl border border-white/10 bg-white/10 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center -mt-1">{error}</p>
            )}

            <div className="text-right -mt-1">
              <button type="button" className="text-sm text-emerald-400 hover:underline font-medium">
                {t('forgot_password')}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-900/30"
            >
              {t('login_btn')}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            {t('no_account')}{' '}
            <Link href="/supplier/register" className="text-emerald-400 font-semibold hover:underline">
              {t('register_link')}
            </Link>
          </p>
        </div>

        {/* Back to customer site */}
        <p className="text-center mt-6">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            ← Asosiy saytga qaytish
          </Link>
        </p>
      </div>
    </div>
  );
}
