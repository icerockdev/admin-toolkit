import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';

export interface CrudlEntityReferenceProps {
  all: CrudlEntityReferenceFetchAll;
}

export type CrudlEntityReferenceFetchAll = (
  entity: CrudlEntity,
  url: string
) => Promise<Record<any, any>>;

export class CrudlDataReference {
  isLoadingAll: boolean = false;
  all: Record<any, any> = {};
}
