/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from 'react';
import { FeatureFilterComponentProps } from '../../types/filters';
declare type IProps = FeatureFilterComponentProps & {
    variants: Record<any, any>;
    autocomplete: boolean;
};
declare const SelectFilter: FC<IProps>;
export { SelectFilter };
