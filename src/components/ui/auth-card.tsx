'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface AuthCardProps {
  children: ReactNode;
  maxWidth?: string;
}

export default function AuthCard({ children, maxWidth = 'max-w-md' }: AuthCardProps) {
  return (
    <div
      className="min-h-screen flex items-start sm:items-center justify-center px-4 py-10"
      style={{ background: 'linear-gradient(135deg, rgba(232,89,79,0.07) 0%, #F5ECDE 55%, #fff 100%)' }}
    >
      <motion.div
        className={`w-full ${maxWidth}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#E8594F] font-bold text-2xl hover:opacity-80 transition-opacity"
          >
            <Leaf className="w-7 h-7" />
            <span>Foody Moody</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
