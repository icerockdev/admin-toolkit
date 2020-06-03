/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, MouseEventHandler, useCallback, useMemo } from 'react';
import { DatePicker, DateRangePicker } from '@material-ui/pickers';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { TextField } from '@material-ui/core';
import { isValid } from 'date-fns';
import { ParsableDate } from '@material-ui/pickers/src/constants/prop-types';

type IProps = {
  label: string;
  value: any;
  isEditing?: boolean;
  isFiltering?: boolean;
  error?: string;
  handler?: (val: string) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
} & Record<string, any>;

const EntityFieldDateRange: FC<IProps> = ({
  value,
  handler,
  label,
  error,
  isFiltering,
  onClick,
}) => {
  const onChange = useCallback(
    (value) => {
      if (!value || !handler) return;

      const filtered = value.map(
        (val: Date) => (val && val.toISOString()) || ''
      );

      handler(filtered.join(','));
    },
    [value, handler]
  );

  const parsed = useMemo<[ParsableDate, ParsableDate]>(() => {
    if (!value) return [null, null];

    const split = value && value.split(',');

    if (!split || split.length !== 2) return [null, null];

    return split.map(
      (date: string) => (isValid(new Date(date)) && parseISO(date)) || null
    );
  }, [value]);

  if (!isFiltering) return null;

  return (
    <div className="datepicker datepicker_range">
      <DateRangePicker
        renderInput={(startProps, endProps) => (
          <>
            <TextField
              {...startProps}
              variant="outlined"
              helperText={label}
              label=""
            />
            <TextField
              {...endProps}
              variant="outlined"
              helperText=""
              label=""
            />
          </>
        )}
        value={parsed}
        onChange={onChange}
      />
    </div>
  );
};

export { EntityFieldDateRange };
