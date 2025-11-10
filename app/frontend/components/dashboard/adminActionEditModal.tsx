'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AdminActionEditForm from '@/components/forms/AdminActionEditForm';
import type {ActionDto} from '@/lib/api/actions';

interface AdminActionEditModalProps {
  open: boolean;
  onClose: () => void;
  action: ActionDto | null;
  onUpdated?: () => void;
}

export default function AdminActionEditModal({
  open,
  onClose,
  action,
  onUpdated,
}: AdminActionEditModalProps) {
  if (!action) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white p-6 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle>Modifier l’action : {action.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <AdminActionEditForm action={action} onUpdated={onUpdated} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
