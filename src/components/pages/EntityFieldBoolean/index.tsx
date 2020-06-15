/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { IEntityFieldProps } from '~/application';
import { Checkbox, FormControlLabel } from '@material-ui/core';

type IProps = IEntityFieldProps & {};

const EntityFieldBoolean: FC<IProps> = ({
  value,
  handler,
  label,
  isEditing,
  onClick,
}) => {
  const onChange = useCallback(() => {
    if (!handler) return;

    handler(!value);
  }, [value, handler]);

  return isEditing ? (
    <FormControlLabel
      control={<Checkbox onChange={onChange} checked={value || false} />}
      label={label}
    />
  ) : (
    <div onClick={onClick}>{!!value ? <CheckIcon /> : <ClearIcon />}</div>
  );
};

export { EntityFieldBoolean };
