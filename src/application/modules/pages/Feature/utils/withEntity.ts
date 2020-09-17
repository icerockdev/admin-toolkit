import { ObjectDiff } from 'typelevel-ts';
import { inject } from 'mobx-react';
import { Feature } from '~/application/modules/pages/Feature';

export type TypedInject<Stores> = <StoreKeyToInject extends keyof Stores>(
  ...storeKeysToInject: StoreKeyToInject[]
) => <ExpectedProps extends Pick<Stores, StoreKeyToInject>>(
  component: React.ComponentType<ExpectedProps>
) => React.ComponentType<
  ObjectDiff<ExpectedProps, Pick<Stores, StoreKeyToInject>>
>;

export const withEntity = (inject as TypedInject<{
  entity: Feature;
}>)('entity');
