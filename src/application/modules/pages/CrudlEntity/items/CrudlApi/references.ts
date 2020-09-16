import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { has } from 'ramda';

export const getReferenceAll = async (
  entity: CrudlEntity<any>,
  name: string,
  host: string
): Promise<Record<string, any>> => {
  if (!has(name, entity.references)) return {};

  const { all, url } = entity.references[name];

  if (!all || !url) return {};

  return entity.api.withToken(all, {
    entity,
    url: new URL(url, host),
  });
};
