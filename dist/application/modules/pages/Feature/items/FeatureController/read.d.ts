import { FeatureController } from './index';
import { FeatureGetReadResult } from '../../types';
export declare function controllerGetRead<T extends Record<string, any>>(controller: FeatureController<T>): Generator<Promise<FeatureGetReadResult<T>>, void, FeatureGetReadResult<T>>;
