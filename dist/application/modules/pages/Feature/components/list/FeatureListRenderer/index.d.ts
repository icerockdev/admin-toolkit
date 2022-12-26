/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from '../../../../../../../../../../admin-toolkit/_node_modules/@types/react';
export declare const FeatureListRenderer: FeatureListRendererComponent;
export declare type FeatureListRendererComponent = FC<Partial<FeatureListRendererProps>>;
export declare type FeatureListRendererProps = Record<'wrapper' | 'header' | 'title' | 'buttons' | 'filters' | 'table' | 'pagination' | 'footer', FC> & {
    container: FC<FeatureListRendererContainerProps>;
};
export declare type FeatureListRendererContainerProps = {
    title: FC;
    buttons: FC;
    filters: FC;
    pagination: FC;
};
