/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { has } from 'ramda';
import { Feature } from '~/application/modules/pages/Feature';
import { FeatureReferenceProps } from '~/application/modules/pages/Feature/types/reference';

export type GetReferenceAllProps = {
  feature: Feature;
  host: string;
  authorization: string;
  name: string;
};

export type GetReferenceAll = (props: GetReferenceAllProps) => Promise<any>;

export const getReferenceAll: GetReferenceAll = async ({
  feature,
  host,
  authorization,
  name,
}): Promise<Record<any, any>> => {
  if (!feature.api.references || !has(name, feature.api.references)) return {};

  const { all, url } = feature.api.references[name] as FeatureReferenceProps;

  if (!all || !url) return {};

  return await all({
    feature,
    url: new URL(url, host).href,
    authorization,
    name,
  });
};
