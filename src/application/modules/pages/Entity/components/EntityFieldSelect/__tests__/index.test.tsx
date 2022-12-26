/* Copyright (c) 2021-2022 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import renderer from 'react-test-renderer';
import { EntityFieldSelect } from '~/application';
import { observable } from 'mobx';

test('EntityFieldSelect view test', () => {
  const element = (
    <EntityFieldSelect
      name="Test select field"
      value={1}
      fields={[]}
      options={{
        1: 'variant 1',
        2: 'variant 2',
        3: 'variant 3',
      }}
    />
  );

  const component = renderer.create(element);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('EntityFieldSelect edit test', () => {
  const store = new (class {
    // @ts-ignore
    @observable value = 1;
  })();

  const handler = (value: number) => (store.value = value);

  const element = (
    <EntityFieldSelect
      name="Test select field"
      value={store.value}
      isEditing={true}
      handler={handler}
      fields={[]}
      options={{
        1: 'variant 1',
        2: 'variant 2',
        3: 'variant 3',
      }}
    />
  );

  const component = renderer.create(element);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
