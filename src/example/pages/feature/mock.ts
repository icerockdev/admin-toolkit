/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IFields } from './index';

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
      nested: {
        index: 1,
        value: 'Nested value',
      },
    })
  );
