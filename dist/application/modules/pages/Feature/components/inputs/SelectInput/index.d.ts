/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from 'react';
import { FeatureInputProps } from '../../../types/field';
declare type IProps = FeatureInputProps & {
    variants: Record<any, any>;
    autocomplete: boolean;
    isLoadingReference?: boolean;
};
declare const SelectInput: FC<IProps>;
export { SelectInput };
