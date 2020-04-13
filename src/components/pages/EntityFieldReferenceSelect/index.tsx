/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, MouseEventHandler, useCallback } from 'react';
import { TextField } from '@material-ui/core';
import { toJS } from 'mobx';

type IProps = {
  label: string;
  value: any;
  error?: string;
  isEditing?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  options: Record<string, any>;
  handler?: (val: any) => void;
} & Record<string, any>;

const EntityFieldReferenceSelect: FC<IProps> = ({
  label,
  value,
  handler,
  error,
  isEditing,
  onClick,
  options,
}) => {
  console.log({ options: toJS(options) });

  const onChange = useCallback(
    (event) => {
      if (!handler) return;

      handler(event.target.value);
    },
    [value, handler]
  );

  return isEditing ? (
    <div>
      R:
      <TextField
        label={label}
        value={value || ''}
        onChange={onChange}
        error={!!error}
        helperText={error}
        variant="outlined"
      />
    </div>
  ) : (
    <div onClick={onClick}>R: {value ? String(value) : <div>&nbsp;</div>}</div>
  );
};

export { EntityFieldReferenceSelect };
