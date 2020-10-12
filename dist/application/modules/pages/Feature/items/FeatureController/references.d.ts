import { FeatureController } from './index';
export declare function controllerGetReferences<T extends Record<string, any>>(controller: FeatureController<T>): Generator<Promise<void>, void, unknown>;
