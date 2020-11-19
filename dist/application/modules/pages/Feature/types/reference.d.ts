/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Feature } from '..';
export interface FeatureReferenceProps {
    all: FeatureReferenceFetchAll;
    url: string;
}
export declare type FeatureReferenceFetchAll = (props: {
    feature: Feature;
    url: string;
    authorization: string;
    name: string;
}) => Promise<Record<any, any>>;
export declare class FeatureDataReference {
    isLoadingAll: boolean;
    all: Record<any, any>;
}
