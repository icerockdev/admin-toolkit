import { has } from 'ramda';
import { Feature } from '~/application/modules/pages/Feature';

type GetReferenceAllProps = {
  entity: Feature;
  host: string;
  token: string;
  name: string;
};

export const getReferenceAll: (
  props: GetReferenceAllProps
) => Promise<any> = async ({
  entity,
  host,
  token,
  name,
}): Promise<Record<any, any>> => {
  if (!has(name, entity.references)) return {};

  const { all, url } = entity.references[name];

  if (!all || !url) return {};

  return await all({
    entity,
    url: new URL(url, host).href,
    token,
    name,
  });
};
