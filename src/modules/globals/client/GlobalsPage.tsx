'use client';

import {useState} from 'react';
import {GlobalsTable} from './GlobalsTable';
import {GlobalForm} from './GlobalForm';

interface GlobalDto {
  key: string;
  value: string;
}

interface GlobalsPageProps {
  initialGlobals: GlobalDto[];
}

export function GlobalsPage({initialGlobals}: GlobalsPageProps) {
  const [editingGlobal, setEditingGlobal] = useState<GlobalDto | null>(null);

  const handleEdit = (global: GlobalDto) => {
    setEditingGlobal(global);
  };

  const handleCloseEdit = () => {
    setEditingGlobal(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Globals</h1>
        <GlobalForm />
      </div>

      {initialGlobals.length > 0 ? (
        <GlobalsTable globals={initialGlobals} onEdit={handleEdit} />
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No globals found. Add one to get started.
        </div>
      )}

      {editingGlobal && (
        <GlobalForm global={editingGlobal} onClose={handleCloseEdit} />
      )}
    </div>
  );
}
