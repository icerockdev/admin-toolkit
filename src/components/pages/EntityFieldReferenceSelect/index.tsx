/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, MouseEventHandler, useCallback, useRef } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

type IProps = {
  label: string;
  value: any;
  isEditing?: boolean;
  handler?: (val: any) => void;
  error?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  options?: Record<any, any>;
} & Record<string, any>;

const EntityFieldReferenceSelect: FC<IProps> = observer(
  ({ label, value, handler, error, isEditing, onClick, options }) => {
    const ref = useRef<HTMLLabelElement>(null);

    const onChange = useCallback(
      (event) => {
        if (!handler) return;
        handler(event.target.value);
      },
      [value, handler]
    );

    return isEditing ? (
      <FormControl variant="outlined">
        <InputLabel htmlFor={label} style={{ whiteSpace: 'nowrap' }} ref={ref}>
          {label}
        </InputLabel>

        <Select
          variant="outlined"
          id={label}
          name={label}
          label={label}
          value={!value ? '' : value}
          onChange={onChange}
          error={!!error}
          inputProps={{ className: 'select' }}
          labelWidth={ref.current?.clientWidth || 100}
          style={{ minWidth: (ref.current?.clientWidth || 100) + 60 }}
        >
          <MenuItem value="">...</MenuItem>

          {options &&
            options.referenceData &&
            Object.keys(options.referenceData).map((item) => (
              <MenuItem key={item} value={item}>
                {options.referenceData[item]}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    ) : (
      <div onClick={onClick}>
        {(options && options.referenceData && options.referenceData[value]) || (
          <div>&nbsp;</div>
        )}
      </div>
    );
  }
);

export { EntityFieldReferenceSelect };
