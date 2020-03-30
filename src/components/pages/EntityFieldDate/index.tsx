/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, MouseEventHandler, useCallback } from 'react';
import { DatePicker } from '@material-ui/pickers';
import format from 'date-fns/format';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

type IProps = {
  value: any;
  isEditing?: boolean;
  error?: string;
  handler?: (val: any) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
} & Record<string, any>;

const EntityFieldDate: FC<IProps> = ({
  value,
  handler,
  error,
  isEditing,
  onClick,
}) => {
  const onChange = useCallback(
    (value: MaterialUiPickersDate) => {
      if (!handler) return;
      handler(value?.toISOString());
    },
    [value, handler]
  );

  return isEditing ? (
    <div>
      <DatePicker
        value={value ? new Date(value) : null}
        onChange={onChange}
        format="dd.MM.yyyy"
        error={!!error}
        helperText={error}
      />
    </div>
  ) : (
    <div onClick={onClick}>{format(new Date(value), 'dd.MM.yyyy')}</div>
  );
};

export { EntityFieldDate };