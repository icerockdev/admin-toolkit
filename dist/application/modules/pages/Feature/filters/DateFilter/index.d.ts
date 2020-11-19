/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from 'react';
import { FeatureFilterComponentProps } from '../../types/filters';
declare type IProps = FeatureFilterComponentProps & {
    isRange: boolean;
};
declare const DateFilter: FC<IProps>;
export { DateFilter };
