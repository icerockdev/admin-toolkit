import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { IFields } from '~/example/base/index';
import { DateField } from '~/application/modules/pages/CrudlEntity/components/fields/DateField';
import { IntegerField } from '~/application/modules/pages/CrudlEntity/components/fields/IntegerField';

export const BASE_FIELDS = [
  new CrudlField<IFields>('name', {
    label: 'Имя',
    features: {
      sort: true,
      filter: true,
    },
  }),
  new IntegerField<IFields>('age', {
    label: 'Возраст',
    accuracy: 2,
    features: {
      sort: true,
      filter: true,
    },
  }),
  new CrudlField<IFields>('role', {
    label: 'Роль',
    features: {
      sort: true,
      filter: true,
    },
  }),
  new CrudlField<IFields>('status', {
    label: 'Статус',
    features: {
      sort: true,
      filter: true,
    },
  }),
  new DateField<IFields>('birthDate', {
    label: 'Дата рождения',
    features: {
      sort: true,
      filter: true,
    },
  }),
  new CrudlField<IFields>('description', {
    label: 'Описание',
    features: {
      sort: true,
      filter: true,
    },
  }),
];
