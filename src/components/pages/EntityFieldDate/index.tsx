/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, MouseEventHandler, useCallback } from 'react';
import { DatePicker } from '@material-ui/pickers';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { TextField } from '@material-ui/core';
import { isValid } from 'date-fns';

type IProps = {
  label: string;
  value: any;
  isEditing?: boolean;
  error?: string;
  handler?: (val: any) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
} & Record<string, any>;

const EntityFieldDate: FC<IProps> = ({
  value,
  handler,
  label,
  error,
  isEditing,
  onClick,
}) => {
  const onChange = useCallback(
    (value) => {
      if (!value || !handler || !isValid(value)) return;
      handler(value.toISOString());
    },
    [value, handler]
  );

  return isEditing ? (
    <div className="datepicker datepicker_date">
      <DatePicker
        renderInput={(props) => (
          <TextField variant="outlined" {...props} helperText={label} />
        )}
        value={value}
        onChange={onChange}
      />
    </div>
  ) : (
    <div onClick={onClick}>
      {value && parseISO(value) ? (
        format(parseISO(value), 'dd.MM.yyyy')
      ) : (
        <div>&nbsp;</div>
      )}
    </div>
  );
};

export { EntityFieldDate };
