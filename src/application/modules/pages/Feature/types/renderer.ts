/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureMode } from '~/application/modules/pages/Feature/types';
import {
  FeatureListRendererComponent,
  FeatureListRendererProps,
} from '~/application/modules/pages/Feature/components/list/FeatureListRenderer';
import {
  FeatureReadRendererComponent,
  FeatureReadRendererProps,
} from '~/application/modules/pages/Feature/components/read/FeatureReadRenderer';

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
