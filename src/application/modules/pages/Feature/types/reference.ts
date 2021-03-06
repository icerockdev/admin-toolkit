/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Feature } from '~/application/modules/pages/Feature';
import { observable } from 'mobx';

export interface FeatureReferenceProps {
  all: FeatureReferenceFetchAll;
  url: string;
}

export type FeatureReferenceFetchAll = (props: {
  feature: Feature;
  url: string;
  authorization: string;
  name: string;
}) => Promise<Record<any, any>>;

export class FeatureDataReference {
  @observable isLoadingAll: boolean = false;
  @observable all: Record<any, any> = {};
}
