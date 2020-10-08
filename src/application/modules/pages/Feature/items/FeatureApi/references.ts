import { has } from 'ramda';
import { Feature } from '~/application/modules/pages/Feature';
import { FeatureReferenceProps } from '~/application/modules/pages/Feature/types/reference';

type GetReferenceAllProps = {
  feature: Feature;
  host: string;
  token: string;
  name: string;
};

export const getReferenceAll: (
  props: GetReferenceAllProps
) => Promise<any> = async ({
  feature,
  host,
  token,
  name,
}): Promise<Record<any, any>> => {
  if (!feature.api.references || !has(name, feature.api.references)) return {};

  const { all, url } = feature.api.references[name] as FeatureReferenceProps;

  if (!all || !url) return {};

  return await all({
    feature,
    url: new URL(url, host).href,
    token,
    name,
  });
};
