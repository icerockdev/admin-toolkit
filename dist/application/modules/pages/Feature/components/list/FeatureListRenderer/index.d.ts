import { FC } from 'react';
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
