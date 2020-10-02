/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { MobXProviderContext } from 'mobx-react';
import { Feature } from '~/application/modules/pages/Feature';
import { Config, Entity } from '~/application';
import { useContext } from 'react';

export function useFeature<T extends Feature = Feature>() {
  return useContext(MobXProviderContext).feature as T;
}

export function useEntity<T extends Entity = Entity>(): T {
  return useContext(MobXProviderContext).entity as T;
}

export function useConfig<T extends Config = Config>(): T {
  return useContext(MobXProviderContext).config as T;
}
