import { FC } from 'react';
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
