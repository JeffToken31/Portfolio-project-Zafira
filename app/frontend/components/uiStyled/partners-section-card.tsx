'use client';

import Image from 'next/image';

interface PartnersCardProps {
  logo: string;
  name: string;
  type: string;
  typeColor?: string;
  description: string;
}

export default function PartnersCard({ logo, name, type, typeColor, description }: PartnersCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <Image
        src={logo}
        alt={name}
        width={100}
        height={100}
        className="object-contain mb-4"
      />
      <h4 className="text-lg font-bold text-[var(--color-primary)]">{name}</h4>
      <p className={`text-sm font-medium ${typeColor} mb-2`}>{type}</p>
      <p className="text-black text-sm">{description}</p>
    </div>
  );
}
