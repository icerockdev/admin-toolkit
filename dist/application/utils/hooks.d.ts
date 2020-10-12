import { Feature } from '../modules/pages/Feature';
import { Config, Entity } from '..';
export declare function useFeature<T extends Feature = Feature>(): T;
export declare function useEntity<T extends Entity = Entity>(): T;
export declare function useConfig<T extends Config = Config>(): T;
