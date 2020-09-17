import { FeatureApi } from '~/application/modules/pages/Feature/items/FeatureApi';
import { IFields } from '~/example/base/index';
import { GenerateBaseData } from '~/example/base/mock';
import { FeatureGetListResult } from '~/application/modules/pages/Feature/types';
import { FeatureReferenceFetchAll } from '~/application/modules/pages/Feature/types/reference';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default new FeatureApi<IFields>(
  {
    list: async ({ url, ...props }): Promise<FeatureGetListResult<IFields>> => {
      console.log(`GET ${url}`, { url, ...props });

      return delay(500).then(() => ({
        data: GenerateBaseData(props.limit),
        count: 100,
        status: 200,
        error: '',
      }));
    },
  },
  {
    list: '/base/all',
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
