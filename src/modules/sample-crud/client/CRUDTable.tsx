'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table';
import {Button} from '@/components/button';
import {Trash2, Edit} from 'lucide-react';
import {deleteGlobalAction} from '../action/CRUDPageAction';
import {useTransition} from 'react';
import {toast} from 'sonner';
import {GlobalDto} from '../model/Global';
import {useRouter} from 'next/navigation';

interface CRUDTableProps {
  globals: GlobalDto[];
  onEdit: (global: GlobalDto) => void;
}

export function CRUDTable({globals, onEdit}: CRUDTableProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (key: string) => {
    startTransition(async () => {
      try {
        await deleteGlobalAction(key);
        toast.success('Global deleted successfully', {
          className: 'globals-toast-delete-success',
        });
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to delete global',
          {
            className: 'globals-toast-delete-error',
          },
        );
      }
    });
  };

  return (
    <Table data-testid="globals-table-container">
      <TableHeader data-testid="globals-table-header">
        <TableRow data-testid="globals-table-header-row">
          <TableHead data-testid="globals-table-head-key">Key</TableHead>
          <TableHead data-testid="globals-table-head-value">Value</TableHead>
          <TableHead
            data-testid="globals-table-head-actions"
            className="w-[100px]"
          >
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody data-testid="globals-table-body">
        {globals.map((global) => (
          <TableRow
            key={global.key}
            data-testid={`globals-table-row-${global.key}`}
          >
            <TableCell
              data-testid={`globals-table-cell-key-${global.key}`}
              className="font-medium"
            >
              {global.key}
            </TableCell>
            <TableCell data-testid={`globals-table-cell-value-${global.key}`}>
              {global.value}
            </TableCell>
            <TableCell data-testid={`globals-table-cell-actions-${global.key}`}>
              <div
                data-testid={`globals-table-actions-${global.key}`}
                className="flex gap-2"
              >
                <Button
                  data-testid={`globals-button-edit-${global.key}`}
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(global)}
                  disabled={isPending}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  data-testid={`globals-button-delete-${global.key}`}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(global.key)}
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
