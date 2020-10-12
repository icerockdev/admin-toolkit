import { FeatureController } from './index';
export declare function controllerPostUpdate<T extends Record<string, any> = Record<string, any>>(controller: FeatureController<T>): Generator<Promise<import("../../types").FeaturePostCreateResult<T>>, void, import("../../types").FeaturePostCreateResult<T>>;
