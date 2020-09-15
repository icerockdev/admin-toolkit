import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { IFields } from '~/example/base/index';

export const BASE_FIELDS = [
  new CrudlField<IFields>('name', {
    label: 'Имя',
    features: {
      sort: true,
    },
  }),
  new CrudlField<IFields>('age', {
    label: 'Возраст',
    features: {
      sort: true,
    },
  }),
  new CrudlField<IFields>('role', {
    label: 'Роль',
    features: {
      sort: true,
    },
  }),
  new CrudlField<IFields>('status', {
    label: 'Статус',
    features: {
      sort: true,
    },
  }),
];
