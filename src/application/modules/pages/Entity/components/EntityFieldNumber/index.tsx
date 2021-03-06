/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback } from 'react';
import { TextField } from '@material-ui/core';
import { IEntityFieldProps } from '~/application';
import { isNil } from 'ramda';

type IProps = IEntityFieldProps & {};

const EntityFieldNumber: FC<IProps> = ({
  label,
  value,
  handler,
  error,
  isEditing,
  onClick,
  options,
  placeholder,
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
        value={isNil(value) ? '' : value}
        onChange={onChange}
        error={!!error}
        helperText={error}
        variant="outlined"
        inputProps={{ step: 'any' }}
        placeholder={placeholder || ''}
      />
    </div>
  ) : (
    <div onClick={onClick}>{val || 0}</div>
  );
};

export { EntityFieldNumber };
