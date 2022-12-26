import { FeatureGetListResult } from '../../types';
import { FeatureController } from './index';
export declare function controllerGetList<T extends Record<string, any>>(controller: FeatureController<T>): Generator<Promise<void> | Promise<FeatureGetListResult<T>>, void, FeatureGetListResult<T>>;
