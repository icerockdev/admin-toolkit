import React from 'react';
import renderer from 'react-test-renderer';
import { EntityFieldString } from "~/application";

jest.mock('date-fns/esm', () => ({ format: jest.fn(), parseISO: jest.fn()}));
jest.mock('ramda/es/omit', () => ({ omit: jest.fn() }));

test('EntityFieldString test', () => {
  const component = renderer.create(
    <EntityFieldString name="Test string field" fields={[]}/>,

  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
