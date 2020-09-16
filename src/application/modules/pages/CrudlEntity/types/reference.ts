import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { observable } from 'mobx';

export interface CrudlEntityReferenceProps {
  all: CrudlEntityReferenceFetchAll;
  url: string;
}

export type CrudlEntityReferenceFetchAll = (props: {
  entity: CrudlEntity;
  url: string;
}) => Promise<Record<any, any>>;

export class CrudlDataReference {
  @observable isLoadingAll: boolean = false;
  @observable all: Record<any, any> = {};
}
