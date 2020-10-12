import { FeatureField } from '~/application/modules/pages/Feature/components/fields/FeatureField';
import { IFields } from '~/example/feature/index';
import { DateField } from '~/application/modules/pages/Feature/components/fields/DateField';
import { IntegerField } from '~/application/modules/pages/Feature/components/fields/IntegerField';
import { SelectField } from '~/application/modules/pages/Feature/components/fields/SelectField';
import { ReferenceField } from '~/application/modules/pages/Feature/components/fields/ReferenceField';

export const FEATURE_FIELDS = [
  new FeatureField<IFields, string>('name', {
    label: 'Имя',
    features: {
      sort: true,
      filter: false,
    },
  }),
  new IntegerField<IFields>('age', {
    label: 'Возраст',
    accuracy: 2,
    features: {
      sort: true,
      filter: true,
    },
    defaultValue: 21,
  }),
  new ReferenceField<IFields, number>('role', {
    label: 'Роль',
    features: {
      sort: true,
      filter: true,
    },
  }),
  new SelectField<IFields, number>('status', {
    label: 'Статус',
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
    features: {
      sort: true,
      filter: true,
    },
  }),
  new FeatureField<IFields, string>('description', {
    label: 'Описание',
    features: {
      sort: true,
      filter: true,
    },
  }),
];
