import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';

export interface CrudlEntityReferenceProps {
  all: CrudlEntityReferenceFetchAll;
  url: string;
}

export type CrudlEntityReferenceFetchAll = (props: {
  entity: CrudlEntity;
  url: string;
}) => Promise<Record<any, any>>;

export class CrudlDataReference {
  isLoadingAll: boolean = false;
  all: Record<any, any> = {};
}
