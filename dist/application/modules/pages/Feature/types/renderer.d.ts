import { FeatureMode } from './index';
import { FeatureListRendererComponent, FeatureListRendererProps } from '../components/list/FeatureListRenderer';
import { FeatureReadRendererComponent, FeatureReadRendererProps } from '../components/read/FeatureReadRenderer';
export interface FeatureRendererProps {
    containers?: {
        list?: FeatureListRendererComponent;
        read?: FeatureReadRendererComponent;
        create?: FeatureReadRendererComponent;
        update?: FeatureReadRendererComponent;
    };
    components?: {
        list?: Partial<FeatureListRendererProps>;
        read?: Partial<FeatureReadRendererProps>;
        update?: Partial<FeatureReadRendererProps>;
        create?: Partial<FeatureReadRendererProps>;
    };
}
export declare type FeatureRendererReaction = (action: FeatureMode, id: number | null) => void;
