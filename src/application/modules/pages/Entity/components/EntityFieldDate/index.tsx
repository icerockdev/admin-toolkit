/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, useMemo } from 'react';
import { DatePicker } from '@material-ui/pickers';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { TextField } from '@material-ui/core';
import { formatISO, isValid } from 'date-fns';
import { IEntityFieldProps } from '~/application';

type IProps = IEntityFieldProps & {};

const EntityFieldDate: FC<IProps> = ({
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
    [handler]
  );

  const parsedValue = useMemo(() => {
    const date = parseISO(value);

    return (date && isValid(date) && formatISO(date)) || null;
  }, [value]);

  return isEditing ? (
    <div className="datepicker datepicker_date">
      <DatePicker
        renderInput={(props) => (
          <TextField
            variant="outlined"
            {...props}
            label={label}
            helperText={error}
            error={!!error}
          />
        )}
        value={parsedValue}
        onChange={onChange}
      />
    </div>
  ) : (
    <div onClick={onClick}>
      {parsedValue ? (
        format(parseISO(parsedValue), 'dd.MM.yyyy')
      ) : (
        <div>&nbsp;</div>
      )}
    </div>
  );
};

export { EntityFieldDate };
