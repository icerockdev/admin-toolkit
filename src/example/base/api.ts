import { CrudlApi } from '~/application/modules/pages/CrudlEntity/items/CrudlApi';
import { IFields } from '~/example/base/index';
import { GenerateBaseData } from '~/example/base/mock';
import { CrudlGetListResult } from '~/application/modules/pages/CrudlEntity/types';

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
    list: '/',
  },
  'old host'
);
