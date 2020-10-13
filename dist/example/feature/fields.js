import { FeatureField } from '../../application/modules/pages/Feature/fields/FeatureField';
import { DateField } from '../../application/modules/pages/Feature/fields/DateField';
import { IntegerField } from '../../application/modules/pages/Feature/fields/IntegerField';
import { SelectField } from '../../application/modules/pages/Feature/fields/SelectField';
import { ReferenceField } from '../../application/modules/pages/Feature/fields/ReferenceField';
import { StringField } from '../../application';
export var FEATURE_FIELDS = [
    new FeatureField('name', {
        label: 'Имя',
        features: {
            sort: true,
            filter: false,
        },
    }),
    new IntegerField('age', {
        label: 'Возраст',
        accuracy: 2,
        features: {
            sort: true,
            filter: true,
        },
        defaultValue: 21,
    }),
    new ReferenceField('role', {
        label: 'Роль',
        features: {
            sort: true,
            filter: true,
        },
        dependencies: ['age'],
    }),
    new SelectField('status', {
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
    new DateField('birthDate', {
        label: 'Дата рождения',
        features: {
            sort: true,
            filter: true,
        },
    }),
    new FeatureField('description', {
        label: 'Описание',
        features: {
            sort: true,
            filter: true,
        },
    }),
    new IntegerField('index', {
        path: ['nested'],
        label: 'Nested index',
    }),
    new StringField('value', {
        path: ['nested'],
        label: 'Nested value',
    }),
];
