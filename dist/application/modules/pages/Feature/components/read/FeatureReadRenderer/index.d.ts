/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from '../../../../../../../../../../admin-toolkit/_node_modules/@types/react';
export declare const FeatureReadRenderer: FeatureReadRendererComponent;
export declare type FeatureReadRendererComponent = FC<Partial<FeatureReadRendererProps>>;
export declare type FeatureReadRendererProps = Record<'wrapper' | 'header' | 'footer' | 'title' | 'buttons' | 'breadcrumbs' | 'content' | 'submit', FC> & {
    container: FC<FeatureReadContainerProps>;
};
export declare type FeatureReadContainerProps = {
    title: FC;
    buttons: FC;
    breadcrumbs: FC;
    submit: FC;
};
