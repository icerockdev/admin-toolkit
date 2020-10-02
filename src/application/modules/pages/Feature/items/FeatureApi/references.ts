import { has } from 'ramda';
import { Feature } from '~/application/modules/pages/Feature';

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
  if (!has(name, feature.references)) return {};

  const { all, url } = feature.references[name];

  if (!all || !url) return {};

  return await all({
    feature,
    url: new URL(url, host).href,
    token,
    name,
  });
};
