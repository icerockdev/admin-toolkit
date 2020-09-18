/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';

import { MobXProviderContext } from 'mobx-react';
import { Feature } from '~/application/modules/pages/Feature';
import { Entity } from '~/application';
import { useContext } from 'react';

export function useFeature<T extends Feature = Feature>() {
  return React.useContext(MobXProviderContext).feature as T;
}

export function useEntity<T extends Entity = Entity>(): Entity {
  return useContext(MobXProviderContext).entity as T;
}
