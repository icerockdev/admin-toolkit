/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, useMemo } from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { TextField } from '@material-ui/core';
import { formatISO, isValid } from 'date-fns';
import { IEntityFieldProps } from '~/application';

type IProps = IEntityFieldProps & {};

const EntityFieldDateTime: FC<IProps> = ({
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

  const parsedValue = useMemo(() => {
    const date = parseISO(value);

    return (date && isValid(date) && formatISO(date)) || null;
  }, [value]);

  return isEditing ? (
    <div className="datepicker datepicker_datetime">
      <DateTimePicker
        renderInput={(props) => (
          <TextField
            variant="outlined"
            {...props}
            label={label}
            helperText=""
          />
        )}
        value={parsedValue}
        onChange={onChange}
        ampm={false}
      />
    </div>
  ) : (
    <div onClick={onClick}>
      {parsedValue ? (
        format(parseISO(parsedValue), 'dd.MM.yyyy HH:mm')
      ) : (
        <div>&nbsp;</div>
      )}
    </div>
  );
};

export { EntityFieldDateTime };
