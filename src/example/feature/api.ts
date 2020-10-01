import { FeatureApi } from '~/application/modules/pages/Feature/items/FeatureApi';
import { IFields } from '~/example/feature/index';
import { generateBaseData } from '~/example/feature/mock';
import {
  FeatureGetListProps,
  FeatureGetListResult,
  FeatureGetReadProps,
  FeatureGetReadResult,
} from '~/application/modules/pages/Feature/types';
import { FeatureReferenceFetchAll } from '~/application/modules/pages/Feature/types/reference';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default new FeatureApi<IFields>(
  {
    list: async ({
      url,
      ...props
    }: FeatureGetListProps): Promise<FeatureGetListResult<IFields>> => {
      console.log(`GET ${url}`, { url, ...props });

      return delay(500).then(() => ({
        data: generateBaseData(props.limit),
        count: 100,
        status: 200,
        error: '',
      }));
    },

    read: async ({
      url,
      id,
      ...props
    }: FeatureGetReadProps): Promise<FeatureGetReadResult<IFields>> => {
      const items = parseInt(id, 10) || 1;
      const href = new URL(id, url).href;

      console.log(`GET ${href}`, { url, id, ...props });

      return delay(500).then(() => ({
        data: generateBaseData(items + 1)[items],
        status: 200,
        error: '',
      }));
    },
  },
  {
    list: '/base/',
    read: '/base/',
  },
  'https://sample.org'
);

export const getRolesAll: FeatureReferenceFetchAll = async (props) => {
  await delay(1000);

  console.log(`REFERENCE ${props.url}`, props);

  return {
    10: 'User',
    20: 'Manager',
    30: 'Admin',
  };
};
