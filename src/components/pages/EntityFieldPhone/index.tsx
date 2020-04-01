/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, MouseEventHandler, useCallback } from 'react';
import { TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';

type IProps = {
  label: string;
  value: any;
  isEditing?: boolean;
  handler?: (val: any) => void;
  error?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
} & Record<string, any>;

const EntityFieldPhone: FC<IProps> = ({
  label,
  value,
  handler,
  error,
  isEditing,
  onClick,
}) => {
  const onChange = useCallback(
    (event) => {
      if (!handler) return;

      handler(event.target.value.replace(/[^\d]/gim, ''));
    },
    [value, handler]
  );

  return isEditing ? (
    <div>
      <InputMask
        mask="+9 (999) 999-99-99"
        value={value ? value.toString() : ''}
        onChange={onChange}
      >
        {() => (
          <TextField
            label={label}
            error={!!error}
            helperText={error}
            variant="outlined"
          />
        )}
      </InputMask>
    </div>
  ) : (
    <div onClick={onClick}>{value ? String(value) : <div>&nbsp;</div>}</div>
  );
};

export { EntityFieldPhone };
