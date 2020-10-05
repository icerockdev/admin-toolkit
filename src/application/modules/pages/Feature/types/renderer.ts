import { FeatureMode } from '~/application/modules/pages/Feature/types/index';
import {
  FeatureListRendererComponent,
  FeatureListRendererProps,
} from '~/application/modules/pages/Feature/components/renderers/list/FeatureListRenderer';
import {
  FeatureReadRendererComponent,
  FeatureReadRendererProps,
} from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadRenderer';

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

export type FeatureRendererReaction = (
  action: FeatureMode,
  id: number | null
) => void;
