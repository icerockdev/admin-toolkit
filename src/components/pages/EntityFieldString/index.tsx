/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, MouseEventHandler, useCallback } from 'react';
import { TextField } from '@material-ui/core';

type IProps = {
  value: any;
  isEditing?: boolean;
  handler?: (val: any) => void;
  error?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
} & Record<string, any>;

const EntityFieldString: FC<IProps> = ({
  value,
  handler,
  error,
  isEditing,
  onClick,
}) => {
  const onChange = useCallback(
    (event) => {
      if (!handler) return;

      handler(event.target.value);
    },
    [value, handler]
  );

  return isEditing ? (
    <div>
      <TextField
        value={value || ''}
        onChange={onChange}
        error={!!error}
        helperText={error}
      />
    </div>
  ) : (
    <div onClick={onClick}>{String(value)}</div>
  );
};

export { EntityFieldString };
