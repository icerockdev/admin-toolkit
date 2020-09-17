import { useContext } from 'react';
import { Entity } from '~/application';
import { MobXProviderContext } from 'mobx-react';

export function useEntity(): Entity {
  return useContext(MobXProviderContext).entity as Entity;
}
