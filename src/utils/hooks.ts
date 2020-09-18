/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { useContext } from 'react';
import { Entity } from '~/application';
import { MobXProviderContext } from 'mobx-react';

export function useEntity(): Entity {
  return useContext(MobXProviderContext).entity as Entity;
}
