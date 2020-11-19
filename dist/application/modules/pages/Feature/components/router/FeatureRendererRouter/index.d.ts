/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from 'react';
import { FeatureRendererProps } from '../../../types/renderer';
import { FeatureListRendererComponent } from '../../list/FeatureListRenderer';
import { FeatureReadRendererComponent } from '../../read/FeatureReadRenderer';
interface IProps {
    list: FeatureListRendererComponent;
    read: FeatureReadRendererComponent;
    update: FeatureReadRendererComponent;
    create: FeatureReadRendererComponent;
    components: FeatureRendererProps['components'];
}
declare const FeatureRendererRouter: FC<IProps>;
export { FeatureRendererRouter };
