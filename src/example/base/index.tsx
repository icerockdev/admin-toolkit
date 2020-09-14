import React from 'react';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import api from '~/example/base/api';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';

export type IFields = {
  name: string;
  age: number;
  role: string;
  status: number;
};

const field = new CrudlField<IFields>('name', {});

export default new CrudlEntity<IFields>('Base', '/base', api, {
  fields: [field],
});
