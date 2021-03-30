/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { EntityFieldString } from "~/application";
import { observable } from "mobx";

test('EntityFieldString view test', () => {
  const element = <EntityFieldString
    name="Test string field"
    value="Text with https://icerock.dev link"
    fields={[]}
  />

  const component = renderer.create(element);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('EntityFieldString edit test', () => {
  const store = new class {
    @observable value = 'Some text';
  }();

  const handler = (value) => store.value = value

  const element = <EntityFieldString
    name="Test string field"
    value={store.value}
    isEditing={true}
    handler={handler}
    fields={[]}
  />

  const component = renderer.create(element);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();

  const wrapper = mount(element);

  expect(store.value).toEqual('Some text');

  wrapper.find('input').simulate('focus');
  wrapper.find('input').simulate('change',{target: {value: 'Some text changed'}});

  expect(store.value).toEqual('Some text changed');
});
