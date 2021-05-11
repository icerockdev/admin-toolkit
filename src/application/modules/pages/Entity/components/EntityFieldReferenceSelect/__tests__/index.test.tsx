/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import renderer from 'react-test-renderer';
import { EntityFieldReferenceSelect } from "~/application";
import { observable } from "mobx";
import TestEntity from "~/application/modules/pages/Entity/__mocks__/TestEntity";

test('EntityFieldReferenceSelect view test', () => {
  const element = <EntityFieldReferenceSelect
    name="testReference"
    value={1}
    fields={[]}
    entity={TestEntity}
  />

  const component = renderer.create(element);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('EntityFieldReferenceSelect edit test', () => {
  const store = new class {
    @observable value = 1;
  }();

  const handler = (value) => store.value = value

  const element = <EntityFieldReferenceSelect
    name="testReference"
    value={store.value}
    fields={[]}
    handler={handler}
    isEditing={true}
    entity={TestEntity}
  />

  const component = renderer.create(element);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
