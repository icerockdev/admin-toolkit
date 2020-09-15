import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CrudlActionEnum } from '~/application/modules/pages/CrudlEntity/types/index';

export type IBaseEntityApiUrls = Partial<Record<CrudlActionEnum, string>>;

export type CrudlGetListProps = {
  entity: CrudlEntity;
  url: string;
};

export type CrudlGetListResult<Fields> = {
  data: Fields[];
  count: number;
  status?: number;
  error?: string;
};

export interface IBaseEntityApiMethods<Fields> {
  list: (props: CrudlGetListProps) => Promise<CrudlGetListResult<Fields>>;
}

export type CrudlGetList = () => void;

export type IBaseEntityApiHost = string;
