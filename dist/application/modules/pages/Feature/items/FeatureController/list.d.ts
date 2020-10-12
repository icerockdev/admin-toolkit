import { FeatureGetListResult } from '../../types';
import { FeatureController } from './index';
export declare function controllerGetList<T extends Record<string, any>>(controller: FeatureController<T>): Generator<Promise<FeatureGetListResult<T>> | Promise<void>, void, FeatureGetListResult<T>>;
