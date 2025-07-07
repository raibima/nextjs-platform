import {getAllGlobals} from '@/modules/globals/model/Global';
import {GlobalsPage} from '@/modules/globals/client/GlobalsPage';

export default async function Page() {
  const globals = await getAllGlobals();
  return <GlobalsPage initialGlobals={globals} />;
}
