import { FeatureField } from '~/application/modules/pages/Feature/components/fields/FeatureField';
import { IFields } from '~/example/feature/index';
import { DateField } from '~/application/modules/pages/Feature/components/fields/DateField';
import { IntegerField } from '~/application/modules/pages/Feature/components/fields/IntegerField';
import { SelectField } from '~/application/modules/pages/Feature/components/fields/SelectField';
import { ReferenceField } from '~/application/modules/pages/Feature/components/fields/ReferenceField';

export const FEATURE_FIELDS = [
  new FeatureField<IFields>('name', {
    label: 'Имя',
    validator: (val) => `Что-то не так ${val}`,
    features: {
      sort: true,
      filter: true,
    },
  }),
  new IntegerField<IFields>('age', {
    label: 'Возраст',
    accuracy: 2,
    validator: (val) => `Что-то не так ${val}`,
    features: {
      sort: true,
      filter: true,
    },
  }),
  new ReferenceField<IFields>('role', {
    label: 'Роль',
    validator: (val) => `Что-то не так ${val}`,
    features: {
      sort: true,
      filter: true,
    },
  }),
  new SelectField<IFields>('status', {
    label: 'Статус',
    validator: (val) => `Что-то не так ${val}`,
    options: {
      10: 'Активен',
      20: 'Неактивен',
      30: 'Заблокирован',
    },
    features: {
      sort: true,
      filter: true,
    },
  }),
  new DateField<IFields>('birthDate', {
    label: 'Дата рождения',
    validator: (val) => `Что-то не так ${val}`,
    features: {
      sort: true,
      filter: true,
    },
  }),
  new FeatureField<IFields>('description', {
    label: 'Описание',
    validator: (val) => `Что-то не так ${val}`,
    features: {
      sort: true,
      filter: true,
    },
  }),
];
