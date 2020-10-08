import { IFields } from '~/example/feature/index';

export const generateBaseData = (items: number) =>
  [...new Array(items)].map(
    (_, id): IFields => ({
      id,
      name: `Person ${id + 1}`,
      age: Math.random() * 80,
      role: 10,
      status: 20,
      birthDate: new Date().toISOString(),
      description: 'Lorem Ipsum and etc',
    })
  );
