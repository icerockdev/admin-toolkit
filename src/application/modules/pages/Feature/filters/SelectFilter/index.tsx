/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC } from 'react';
import { FeatureFilterComponentProps } from '~/application/modules/pages/Feature/types/filters';
import { FilterWrapper } from '~/application/modules/pages/Feature/components/filters/FilterWrapper';
import { SelectInput } from '~/application/modules/pages/Feature/components/inputs/SelectInput';
import { observer } from 'mobx-react';

type IProps = FeatureFilterComponentProps & {
  variants: Record<any, any>;
  autocomplete: boolean;
};

const SelectFilter: FC<IProps> = observer(
  ({
    label,
    variants,
    inline,
    autocomplete,
    onChange,
    onReset,
    disabled,
    value,
  }) => (
    <FilterWrapper onClear={onReset} inline={inline}>
      <SelectInput
        label={label}
        onChange={onChange}
        variants={variants}
        autocomplete={autocomplete}
        disabled={disabled}
        value={value}
      />
    </FilterWrapper>
  )
);

export { SelectFilter };
