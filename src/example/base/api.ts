import { CrudlApi } from '~/application/modules/pages/CrudlEntity/items/CrudlApi';
import { IFields } from '~/example/base/index';
import { GenerateBaseData } from '~/example/base/mock';
import { CrudlGetListResult } from '~/application/modules/pages/CrudlEntity/types';
import { CrudlEntityReferenceFetchAll } from '~/application/modules/pages/CrudlEntity/types/reference';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default new CrudlApi<IFields>(
  {
    list: async ({ url, ...props }): Promise<CrudlGetListResult<IFields>> => {
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

export const getRolesAll: CrudlEntityReferenceFetchAll = async (props) => {
  await delay(1000);

  console.log(`REFERENCE ${props.url}`, props);

  return {
    10: 'User',
    20: 'Manager',
    30: 'Admin',
  };
};
