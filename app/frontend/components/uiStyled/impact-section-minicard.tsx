'use client';

import React, { ReactNode } from 'react';

interface ImpactMiniCardProps {
  icon: ReactNode; // pour les icônes
  number: number | string;
  title: string;
  color: string;
}

export default function ImpactMiniCard({
  icon,
  number,
  title,
  color,
}: ImpactMiniCardProps) {
  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md w-32">
      <div className={`text-3xl mb-2 ${color}`}>{icon}</div>
      <div className={`text-2xl font-bold ${color}`}>{number}</div>
      <div className="text-sm text-gray-600 text-center">{title}</div>
    </div>
  );
}
