import { MobXProviderContext } from 'mobx-react';
import React from 'react';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';

export function useEntity<T = CrudlEntity>() {
  return React.useContext(MobXProviderContext).entity as T;
}
