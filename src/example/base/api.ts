import { CrudlApi } from '~/application/modules/pages/CrudlEntity/items/CrudlApi';
import { IFields } from '~/example/base/index';
import { CrudlActionEnum } from '~/application/modules/pages/CrudlEntity/types';
import { SAMPLE_BASE_DATA } from '~/example/base/mock';

export default new CrudlApi<IFields>(
  {
    [CrudlActionEnum.list]: async () =>
      Promise.resolve({
        data: SAMPLE_BASE_DATA,
        count: 10,
      }),
  },
  {},
  'old host'
);
