'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import {
  Leaf, LayoutDashboard, Plus, Package,
  ShoppingBag, Settings, LogOut, Menu, X, ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('supplier_dashboard.nav');
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { supplierUser, hydrated, logoutSupplier } = useAuth();

  useEffect(() => {
    if (hydrated && !supplierUser) {
      router.push('/supplier/login');
    }
  }, [hydrated, supplierUser, router]);

  if (!hydrated || !supplierUser) return null;

  const handleLogout = () => {
    logoutSupplier();
    router.push('/');
  };

  const navItems = [
    { href: '/supplier/dashboard', icon: LayoutDashboard, label: t('dashboard'), exact: true },
    { href: '/supplier/dashboard/add-listing', icon: Plus, label: t('add_listing') },
    { href: '/supplier/dashboard/listings', icon: Package, label: t('listings') },
    { href: '/supplier/dashboard/orders', icon: ShoppingBag, label: t('orders') },
    { href: '/supplier/dashboard/settings', icon: Settings, label: t('settings') },
  ];

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  function SidebarContent() {
    return (
      <div className="h-full flex flex-col bg-slate-900">
        <div className="px-5 py-5 border-b border-slate-800/60">
          <Link href="/" className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
            <Leaf className="w-5 h-5" />
            <span>Foody Moody</span>
          </Link>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium uppercase tracking-wider">
            {t('supplier_portal')}
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
          {navItems.map(({ href, icon: Icon, label, exact }) => (
            <Link
              key={href}
              href={href as '/'}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(href, exact)
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {isActive(href, exact) && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-800/60">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 bg-slate-900 fixed left-0 top-0 h-screen z-30">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 h-full shadow-2xl z-10">
            <SidebarContent />
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-3 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Mobile topbar */}
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="flex items-center gap-1.5 text-emerald-600 font-bold text-base">
            <Leaf className="w-4 h-4" />
            Foody Moody
          </Link>
          <LanguageSwitcher />
        </header>

        {/* Desktop topbar */}
        <header className="hidden lg:flex sticky top-0 z-20 bg-white border-b border-slate-200 px-8 h-14 items-center justify-end shadow-sm">
          <LanguageSwitcher />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
