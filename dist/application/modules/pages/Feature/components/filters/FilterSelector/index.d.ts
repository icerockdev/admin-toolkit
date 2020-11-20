/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from 'react';
import { FeatureField } from '../../../fields/FeatureField';
interface IProps {
    fields: FeatureField[];
    selected: string[];
    onSelect: (name: string) => void;
}
declare const FilterSelector: FC<IProps>;
export { FilterSelector };
