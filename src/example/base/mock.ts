import { IFields } from '~/example/base/index';

export const GenerateBaseData = (items: number) =>
  [...new Array(items)].map(
    (_, i): IFields => ({
      name: `Person ${i + 1}`,
      age: Math.random() * 80,
      role: 'User',
      status: 20,
    })
  );
