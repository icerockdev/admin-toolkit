import { FeatureApi } from '~/application/modules/pages/Feature/items/FeatureApi';
import { IFields } from '~/example/feature/index';
import { generateBaseData } from '~/example/feature/mock';
import {
  FeatureGetListProps,
  FeatureGetListResult,
  FeatureGetReadProps,
  FeatureGetReadResult,
  FeaturePostCreateProps,
  FeaturePostCreateResult,
  FeaturePostUpdateProps,
  FeaturePostUpdateResult,
} from '~/application/modules/pages/Feature/types';
import { FeatureReferenceFetchAll } from '~/application/modules/pages/Feature/types/reference';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default new FeatureApi<IFields>(
  {
    list: async ({
      url,
      ...props
    }: FeatureGetListProps): Promise<FeatureGetListResult<IFields>> => {
      console.log(`LIST ${url}`, { url, ...props });

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

      console.log(`READ ${href}`, { url, id, ...props });

      return delay(500).then(() => ({
        data: generateBaseData(items + 1)[items],
        status: 200,
        error: '',
      }));
    },

    create: async ({
      url,
      ...props
    }: FeaturePostCreateProps<IFields>): Promise<
      FeaturePostCreateResult<IFields>
    > => {
      console.log(`CREATE ${url}`, { url, ...props });

      return delay(500).then(() => ({
        data: generateBaseData(1)[0],
        status: 200,
        error: '',
      }));
    },

    update: async ({
      url,
      id,
      ...props
    }: FeaturePostUpdateProps<IFields>): Promise<
      FeaturePostUpdateResult<IFields>
    > => {
      console.log(`UPDATE ${url}`, { url, ...props });

      return delay(500).then(() => ({
        data: generateBaseData(id + 1)[id],
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
