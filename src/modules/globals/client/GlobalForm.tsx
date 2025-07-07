'use client';

import {useState, useTransition} from 'react';
import {Button} from '@/components/button';
import {Input} from '@/components/input';
import {Label} from '@/components/label';
import {toast} from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog';
import {addGlobalAction, updateGlobalAction} from '../action/GlobalPageAction';
import {Plus} from 'lucide-react';

interface GlobalDto {
  key: string;
  value: string;
}

interface GlobalFormProps {
  global?: GlobalDto;
  onClose?: () => void;
  trigger?: React.ReactNode;
}

export function GlobalForm({global, onClose, trigger}: GlobalFormProps) {
  const [open, setOpen] = useState(Boolean(global));
  const [key, setKey] = useState(global?.key || '');
  const [value, setValue] = useState(global?.value || '');
  const [isPending, startTransition] = useTransition();

  const isEditing = Boolean(global);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim() || !value.trim()) return;

    startTransition(async () => {
      try {
        if (isEditing) {
          await updateGlobalAction(key, value);
          toast.success('Global updated successfully');
        } else {
          await addGlobalAction(key, value);
          toast.success('Global added successfully');
        }
        setOpen(false);
        if (onClose) onClose();
        if (!isEditing) {
          setKey('');
          setValue('');
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'An error occurred',
        );
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
    if (!isEditing) {
      setKey('');
      setValue('');
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Global
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Global' : 'Add New Global'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key"
              disabled={isEditing || isPending}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              disabled={isPending}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : isEditing ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
