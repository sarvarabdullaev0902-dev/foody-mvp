'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CustomerUser = { name: string; phone: string };
type SupplierUser = { name: string; email: string };

type AuthContextType = {
  customerUser: CustomerUser | null;
  supplierUser: SupplierUser | null;
  hydrated: boolean;
  loginCustomer: (phone: string, password: string) => boolean;
  loginSupplier: (email: string, password: string) => boolean;
  registerSupplier: (name: string) => void;
  logoutCustomer: () => void;
  logoutSupplier: () => void;
};

export const DEMO_CUSTOMER = { phone: '+998901234567', password: 'demo123', name: 'Demo Foydalanuvchi' };
export const DEMO_SUPPLIER = { email: 'demo@foody.uz', password: 'demo123', name: 'Salom Bakery' };

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customerUser, setCustomerUser] = useState<CustomerUser | null>(null);
  const [supplierUser, setSupplierUser] = useState<SupplierUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem('foody_customer');
      const s = localStorage.getItem('foody_supplier');
      if (c) setCustomerUser(JSON.parse(c));
      if (s) setSupplierUser(JSON.parse(s));
    } catch {}
    setHydrated(true);
  }, []);

  const loginCustomer = (phone: string, password: string): boolean => {
    if (phone === DEMO_CUSTOMER.phone && password === DEMO_CUSTOMER.password) {
      const user = { name: DEMO_CUSTOMER.name, phone };
      setCustomerUser(user);
      try { localStorage.setItem('foody_customer', JSON.stringify(user)); } catch {}
      return true;
    }
    return false;
  };

  const loginSupplier = (email: string, password: string): boolean => {
    if (email === DEMO_SUPPLIER.email && password === DEMO_SUPPLIER.password) {
      const user = { name: DEMO_SUPPLIER.name, email };
      setSupplierUser(user);
      try { localStorage.setItem('foody_supplier', JSON.stringify(user)); } catch {}
      return true;
    }
    return false;
  };

  const registerSupplier = (name: string) => {
    const user = { name: name || "Mening Do'konim", email: 'new@foody.uz' };
    setSupplierUser(user);
    try { localStorage.setItem('foody_supplier', JSON.stringify(user)); } catch {}
  };

  const logoutCustomer = () => {
    setCustomerUser(null);
    try { localStorage.removeItem('foody_customer'); } catch {}
  };

  const logoutSupplier = () => {
    setSupplierUser(null);
    try { localStorage.removeItem('foody_supplier'); } catch {}
  };

  return (
    <AuthContext.Provider value={{
      customerUser, supplierUser, hydrated,
      loginCustomer, loginSupplier, registerSupplier,
      logoutCustomer, logoutSupplier,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
