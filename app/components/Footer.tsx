'use client';

import { PERSONAL_INFO } from '@/app/types/portfolio';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-gray-800 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-white font-semibold">{PERSONAL_INFO.name}</p>
            <p className="text-gray-500 text-sm">{PERSONAL_INFO.title}</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">Building digital experiences by day, exploring rhythm by night.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">© {currentYear} {PERSONAL_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}