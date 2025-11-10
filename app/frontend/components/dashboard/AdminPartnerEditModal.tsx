'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AdminPartnerEditForm from '@/components/forms/AdminPartnerEditForm';
import type {PartnerDto} from '@/lib/api/partners';

interface AdminPartnerEditModalProps {
  open: boolean;
  onClose: () => void;
  partner: PartnerDto | null;
  onUpdated?: () => void;
}

export default function AdminPartnerEditModal({
  open,
  onClose,
  partner,
  onUpdated,
}: AdminPartnerEditModalProps) {
  if (!partner) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white p-6 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle>
            Modifier le partenaire : {partner.companyName}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <AdminPartnerEditForm partner={partner} onUpdated={onUpdated} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
