'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React from 'react';

const NavDashboard: React.FC = () => {
  const pathname = usePathname();

  const links = [
    {name: 'Accueil', href: '/dashboard/admin'},
    {name: 'Bénéficiaires', href: '/dashboard/admin/user'},
    {name: 'Témoignages', href: '/dashboard/admin/temoignages'},
    {name: 'Blog', href: '/dashboard/admin/blog'},
    {name: 'Prestations', href: '/dashboard/admin/action'},
  ];

  return (
    <nav className="flex justify-around px-6 w-full text-[var(--color-primary)] font-semibold">
      {links.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-pink-500 after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all
              ${isActive ? 'text-pink-500 after:w-full' : 'hover:text-pink-500'}
            `}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavDashboard;
