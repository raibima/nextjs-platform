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
import {deleteGlobalAction} from '../action/GlobalPageAction';
import {useTransition} from 'react';
import {toast} from 'sonner';

interface GlobalDto {
  key: string;
  value: string;
}

interface GlobalsTableProps {
  globals: GlobalDto[];
  onEdit: (global: GlobalDto) => void;
}

export function GlobalsTable({globals, onEdit}: GlobalsTableProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (key: string) => {
    startTransition(async () => {
      try {
        await deleteGlobalAction(key);
        toast.success('Global deleted successfully');
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to delete global',
        );
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {globals.map((global) => (
          <TableRow key={global.key}>
            <TableCell className="font-medium">{global.key}</TableCell>
            <TableCell>{global.value}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(global)}
                  disabled={isPending}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
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
