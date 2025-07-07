import {getAllGlobals} from '@/modules/sample-crud/model/Global';
import {CRUDPage} from '@/modules/sample-crud/client/CRUDPage';

export default async function Page() {
  const globals = await getAllGlobals();
  return (
    <div data-testid="globals-page-wrapper">
      <CRUDPage initialGlobals={globals} />
    </div>
  );
}
