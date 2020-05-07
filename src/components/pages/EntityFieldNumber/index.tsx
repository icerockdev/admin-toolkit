/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, MouseEventHandler, useCallback } from 'react';
import { TextField } from '@material-ui/core';

type IProps = {
  label: string;
  value: any;
  error?: string;
  isEditing?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  handler?: (val: any) => void;
  options?: { accuracy?: number };
} & Record<string, any>;

const EntityFieldNumber: FC<IProps> = ({
  label,
  value,
  handler,
  error,
  isEditing,
  onClick,
  options,
}) => {
  const onChange = useCallback(
    (event) => {
      if (!handler) return;

      handler(event.target.value);
    },
    [value, handler]
  );

  const val =
    (value &&
      parseFloat(value) &&
      parseFloat(parseFloat(value).toFixed(options?.accuracy || 6))) ||
    0;

  return isEditing ? (
    <div>
      <TextField
        type="number"
        label={label}
        value={value || ''}
        onChange={onChange}
        error={!!error}
        helperText={error}
        variant="outlined"
      />
    </div>
  ) : (
    <div onClick={onClick}>{val || 0}</div>
  );
};

export { EntityFieldNumber };
