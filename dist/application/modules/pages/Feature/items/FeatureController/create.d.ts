import { FeatureController } from './index';
import { FeaturePostCreateResult } from '../../types';
export declare function controllerPostCreate<T extends Record<string, any> = Record<string, any>>(controller: FeatureController<T>): Generator<Promise<FeaturePostCreateResult<T>>, void, FeaturePostCreateResult<T>>;
