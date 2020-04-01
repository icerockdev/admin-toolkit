/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, ChangeEvent, useMemo } from 'react';
import { IEntityField } from '~/application';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { observer } from 'mobx-react';

interface InquiryData {
  type: number;
}

interface IProps {
  label: string;
  data: InquiryData;
  value: any;
  fields: IEntityField[];
  error: string;
  options: { types: Record<number, number[]>; titles: Record<number, string> };
  isEditing?: boolean;
  handler: (val: any) => void;
  withToken: (req: any, args: any) => any;
}

interface Inquiry {
  label: string;
  value: number;
}

const InquiryStatusField: FC<IProps> = observer(
  ({ data, label, value, handler, error, options, withToken, isEditing }) => {
    const onInquiryChange = useCallback(
      async (event: ChangeEvent<{ value: any }>) => {
        handler(parseInt(event.target.value) || null);
      },
      [data, options, handler]
    );

    const variants = useMemo((): Record<number, string> => {
      if (!options.types || !options.types[data.type]) {
        return {};
      }

      return options.types[data.type].reduce(
        (obj, c) => ({
          ...obj,
          [c]: options.titles[c],
        }),
        {}
      );
    }, [data.type, options.titles, options.types]);

    return isEditing ? (
      <FormControl variant="outlined">
        <InputLabel htmlFor={label}>{label}</InputLabel>

        <Select
          variant="outlined"
          id={label}
          name={label}
          label={label}
          value={value || ''}
          onChange={onInquiryChange}
          error={!!error}
          inputProps={{ className: 'select' }}
        >
          <MenuItem value="">...</MenuItem>

          {Object.keys(variants).length > 0 &&
            Object.keys(variants).map((variant) => (
              <MenuItem key={variant} value={variant}>
                {options.titles[parseInt(variant)] || variant.toString()}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    ) : (
      <div>{(value && options?.titles[value]) || ''}</div>
    );
  }
);

export { InquiryStatusField };
