'use client';

import {useState, useTransition} from 'react';
import {useRouter} from 'next/navigation';
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
import {addGlobalAction, updateGlobalAction} from '../action/CRUDPageAction';
import {Plus} from 'lucide-react';
import {GlobalDto} from '../model/Global';

interface CRUDFormProps {
  global?: GlobalDto;
  onClose?: () => void;
  trigger?: React.ReactNode;
}

export function CRUDForm({global, onClose, trigger}: CRUDFormProps) {
  const [open, setOpen] = useState(Boolean(global));
  const [key, setKey] = useState(global?.key || '');
  const [value, setValue] = useState(global?.value || '');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isEditing = Boolean(global);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim() || !value.trim()) return;

    startTransition(async () => {
      try {
        if (isEditing) {
          await updateGlobalAction(key, value);
          toast.success('Global updated successfully', {
            className: 'globals-toast-update-success',
          });
        } else {
          await addGlobalAction(key, value);
          toast.success('Global added successfully', {
            className: 'globals-toast-add-success',
          });
        }
        router.refresh();
        setOpen(false);
        if (onClose) onClose();
        if (!isEditing) {
          setKey('');
          setValue('');
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'An error occurred',
          {
            className: isEditing
              ? 'globals-toast-update-error'
              : 'globals-toast-add-error',
          },
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
      <DialogTrigger asChild data-testid="globals-form-trigger">
        {trigger || (
          <Button data-testid="globals-button-add">
            <Plus className="h-4 w-4 mr-2" />
            Add Global
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        data-testid={
          isEditing ? 'globals-form-edit-dialog' : 'globals-form-add-dialog'
        }
        className="sm:max-w-[425px]"
      >
        <DialogHeader data-testid="globals-form-header">
          <DialogTitle data-testid="globals-form-title">
            {isEditing ? 'Edit Global' : 'Add New Global'}
          </DialogTitle>
        </DialogHeader>
        <form
          data-testid="globals-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div data-testid="globals-form-key-field" className="space-y-2">
            <Label htmlFor="key" data-testid="globals-form-key-label">
              Key
            </Label>
            <Input
              id="key"
              data-testid="globals-form-key-input"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key"
              disabled={isEditing || isPending}
              required
            />
          </div>
          <div data-testid="globals-form-value-field" className="space-y-2">
            <Label htmlFor="value" data-testid="globals-form-value-label">
              Value
            </Label>
            <Input
              id="value"
              data-testid="globals-form-value-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              disabled={isPending}
              required
            />
          </div>
          <div
            data-testid="globals-form-actions"
            className="flex justify-end space-x-2"
          >
            <Button
              type="button"
              variant="outline"
              data-testid="globals-form-button-cancel"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-testid="globals-form-button-submit"
              disabled={isPending}
              aria-busy={isPending}
            >
              <span
                data-testid={
                  isPending ? 'globals-button-saving' : 'globals-button-ready'
                }
              >
                {isPending ? 'Saving...' : isEditing ? 'Update' : 'Add'}
              </span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
