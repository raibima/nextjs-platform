'use client';

import {useState} from 'react';
import {CRUDTable} from './CRUDTable';
import {CRUDForm} from './CRUDForm';
import {GlobalDto} from '../model/Global';

interface CRUDPageProps {
  initialGlobals: GlobalDto[];
}

export function CRUDPage({initialGlobals}: CRUDPageProps) {
  const [editingGlobal, setEditingGlobal] = useState<GlobalDto | null>(null);

  const handleEdit = (global: GlobalDto) => {
    setEditingGlobal(global);
  };

  const handleCloseEdit = () => {
    setEditingGlobal(null);
  };

  return (
    <div
      data-testid="globals-page-container"
      className="container mx-auto py-8"
    >
      <div
        data-testid="globals-page-header"
        className="flex justify-between items-center mb-6"
      >
        <h1 data-testid="globals-page-title" className="text-3xl font-bold">
          Globals
        </h1>
        <CRUDForm />
      </div>

      {initialGlobals.length > 0 ? (
        <CRUDTable globals={initialGlobals} onEdit={handleEdit} />
      ) : (
        <div
          data-testid="globals-empty-state"
          className="text-center py-8 text-muted-foreground"
        >
          No globals found. Add one to get started.
        </div>
      )}

      {editingGlobal && (
        <CRUDForm global={editingGlobal} onClose={handleCloseEdit} />
      )}
    </div>
  );
}
