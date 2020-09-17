import { MobXProviderContext } from 'mobx-react';
import React from 'react';
import { Feature } from '~/application/modules/pages/Feature';

export function useEntity<T = Feature>() {
  return React.useContext(MobXProviderContext).entity as T;
}
