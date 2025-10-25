import React, {useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/uiStyled/button';

interface AddEntryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (qty: number) => void;
}

export default function AddEntryModal({
  open,
  onClose,
  onSubmit,
}: AddEntryModalProps) {
  const [quantity, setQuantity] = useState<number>(0);

  const handleSubmit = () => {
    if (quantity > 0) {
      onSubmit(quantity);
      setQuantity(0);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-xl bg-white">
        <DialogHeader>
          <DialogTitle>Ajouter une entrée</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-4">
          <input
            type="number"
            min={0}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary"
            placeholder="Quantité"
          />
          <Button onClick={handleSubmit} variant="jaune">
            Ajouter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
