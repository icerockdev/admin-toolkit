/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, useRef, useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { IEntityFieldProps } from '~/application';

type IProps = IEntityFieldProps & {};

const EntityFieldSelect: FC<IProps> = ({
  name,
  label,
  value,
  handler,
  error,
  isEditing,
  onClick,
  options
}) => {
  const onChange = useCallback(
    (event) => {
      if (!handler) return;

      handler(event.target.value);
    },
    [handler]
  );

  // noinspection TypeScriptValidateTypes
  const ref = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth((ref.current && ref.current.clientWidth) || 0);
  }, [ref]);

  return isEditing ? (
    <FormControl variant="outlined">
      <InputLabel htmlFor={name} error={!!error} style={{ whiteSpace: 'nowrap' }} ref={ref}>
        {label}
      </InputLabel>

      <Select
        variant="outlined"
        id={label}
        name={name}
        value={!value ? '' : value}
        onChange={onChange}
        error={!!error}
        inputProps={{ className: 'select' }}
        labelWidth={labelWidth}
        style={{ minWidth: labelWidth + 40 }}
      >
        <MenuItem value="">...</MenuItem>

        {options &&
          Object.keys(options).map((item) => (
            <MenuItem key={item} value={item}>
              {options[item]}
            </MenuItem>
          ))}
      </Select>

      <FormHelperText error={!!error}>{error}</FormHelperText>
    </FormControl>
  ) : (
    <div onClick={onClick}>
      {(options && options[value]) || <div>&nbsp;</div>}
    </div>
  );
};

export { EntityFieldSelect };
