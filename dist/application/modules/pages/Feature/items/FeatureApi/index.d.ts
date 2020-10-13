import { FeatureApiHost, FeatureApiMethods, FeatureApiReferences, FeatureApiUrls, FeatureGetListResult, FeatureGetReadResult, FeaturePostCreateResult, FeaturePostUpdateResult } from '../../types/api';
import { Feature } from '../..';
import { FeatureData } from '../FeatureData';
import { FeatureFeature } from '../../types';
export declare class FeatureApi<Fields extends Record<string, any> = Record<string, any>> {
    private feature;
    constructor(feature: Feature<Fields>);
    get methods(): FeatureApiMethods<Fields> | undefined;
    get host(): FeatureApiHost;
    get urls(): Required<FeatureApiUrls>;
    get data(): FeatureData<Fields>;
    get references(): FeatureApiReferences<Fields> | undefined;
    get request(): (cb: any, props: any) => any;
    useFeature: (feature: Feature<Fields>) => void;
    get availableApiFeatures(): Record<FeatureFeature, boolean>;
    list: (feature: Feature<Fields>) => Promise<FeatureGetListResult<Fields>>;
    read: (id: any) => Promise<FeatureGetReadResult<Fields>>;
    create: (data: FeatureData['editor']) => Promise<FeaturePostCreateResult<Fields>>;
    update: (id: any, data: FeatureData['editor']) => Promise<FeaturePostUpdateResult<Fields>>;
    delete: (id: any) => Promise<void>;
    getReferencesAll<Fields>(): Promise<void>;
}
