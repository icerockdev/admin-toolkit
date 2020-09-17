import { MobXProviderContext } from 'mobx-react';
import React from 'react';
import { Feature } from '~/application/modules/pages/Feature';

export function useFeature<T = Feature>() {
  return React.useContext(MobXProviderContext).feature as T;
}
