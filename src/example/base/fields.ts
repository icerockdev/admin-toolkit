import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { IFields } from '~/example/base/index';

export const BASE_FIELDS = [
  new CrudlField<IFields>('name', {
    label: 'Имя',
  }),
  new CrudlField<IFields>('age', {
    label: 'Возраст',
  }),
  new CrudlField<IFields>('role', {
    label: 'Роль',
  }),
  new CrudlField<IFields>('status', {
    label: 'Статус',
  }),
];
