import { IFields } from './index';
import { FeatureApiMethodCreate, FeatureApiMethodDelete, FeatureApiMethodGet, FeatureApiMethodList, FeatureApiMethodUpdate } from '../../../application/modules/pages/Feature/types';
import { FeatureReferenceFetchAll } from '../../../application/modules/pages/Feature/types/reference';
export declare const getFeatureList: FeatureApiMethodList<IFields>;
export declare const getFeature: FeatureApiMethodGet<IFields>;
export declare const createFeature: FeatureApiMethodCreate<IFields>;
export declare const updateFeature: FeatureApiMethodUpdate<IFields>;
export declare const deleteFeature: FeatureApiMethodDelete<IFields>;
export declare const getRolesAll: FeatureReferenceFetchAll;
