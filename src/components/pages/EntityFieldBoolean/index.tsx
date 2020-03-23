/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, MouseEventHandler, useCallback } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { Checkbox } from '@material-ui/core';

type IProps = {
  value: any;
  isEditing?: boolean;
  handler?: (val: any) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
} & Record<string, any>;

const EntityFieldBoolean: FC<IProps> = ({
  value,
  handler,
  isEditing,
  onClick,
}) => {
  const onChange = useCallback(() => {
    if (!handler) return;

    handler(!value);
  }, [value, handler]);

  return isEditing ? (
    <div>
      <Checkbox onChange={onChange} checked={value || false} />
    </div>
  ) : (
    <div onClick={onClick}>{!!value ? <CheckIcon /> : <ClearIcon />}</div>
  );
};

export { EntityFieldBoolean };
