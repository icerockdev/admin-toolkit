import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import api from '~/example/base/api';

type IFields = {
  name: string;
  age: number;
};

export default new CrudlEntity<IFields>('Base', '/base', api);
