/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Feature } from '../..';
import { FeatureRendererProps } from '../../types/renderer';
import { FeatureListRendererComponent } from '../../components/list/FeatureListRenderer';
import { FeatureReadRendererComponent } from '../../components/read/FeatureReadRenderer';
export declare class FeatureRenderer<T extends Feature<any> = Feature<any>> {
    constructor({ containers, components }?: FeatureRendererProps);
    list: FeatureListRendererComponent;
    read: FeatureReadRendererComponent;
    create: FeatureReadRendererComponent;
    update: FeatureReadRendererComponent;
    components: FeatureRendererProps['components'];
    get output(): JSX.Element;
}
