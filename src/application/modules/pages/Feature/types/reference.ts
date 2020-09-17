import { Feature } from '~/application/modules/pages/Feature';
import { observable } from 'mobx';

export interface FeatureReferenceProps {
  all: FeatureReferenceFetchAll;
  url: string;
}

export type FeatureReferenceFetchAll = (props: {
  feature: Feature;
  url: string;
  token: string;
  name: string;
}) => Promise<Record<any, any>>;

export class FeatureDataReference {
  @observable isLoadingAll: boolean = false;
  @observable all: Record<any, any> = {};
}
