import { IFields } from '~/example/base/index';

export const GenerateBaseData = (items: number) =>
  [...new Array(items)].map(
    (_, id = 0): IFields => ({
      id,
      name: `Person ${id + 1}`,
      age: Math.random() * 80,
      role: 10,
      status: 20,
      birthDate: new Date().toISOString(),
      description: 'Lorem Ipsum and etc',
    })
  );
