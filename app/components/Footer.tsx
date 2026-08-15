'use client';

import { PERSONAL_INFO } from '@/app/types/portfolio';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-surface-elevated">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Name & Title */}
          <div className="text-center md:text-left">
            <p className="text-text-primary font-semibold mb-1">
              {PERSONAL_INFO.name}
            </p>
            <p className="metadata text-text-tertiary">
              {PERSONAL_INFO.title}
            </p>
          </div>

          {/* Tagline */}
          <div className="text-center md:text-right">
            <p className="body-text text-text-tertiary">
              Building digital experiences by day, exploring rhythm by night.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="metadata text-text-tertiary">
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}