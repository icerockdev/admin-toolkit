/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import { observer } from 'mobx-react';
import { IEntityFieldProps } from '~/application';

type IProps = IEntityFieldProps & {};

const EntityFieldReferenceSelect: FC<IProps> = observer(
  ({label, name, value, handler, error, isEditing, onClick, entity}) => {
    const emptyNode = (<div>&nbsp;</div>)

    if (!entity) {
      return emptyNode
    }

    const options = entity.referenceData[name] || {};

    // noinspection TypeScriptValidateTypes
    const ref = useRef<HTMLLabelElement>(null);

    const onChange = useCallback(
      (event) => {
        if (!handler) return;
        handler(event.target.value);
      },
      [handler]
    );

    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => {
      setLabelWidth((ref.current && ref.current.clientWidth) || 0);
    }, [ref.current]);

    return isEditing ? (
      <FormControl variant="outlined">
        <InputLabel htmlFor={name} error={!!error} style={{ whiteSpace: 'nowrap' }} ref={ref}>
          {label}
        </InputLabel>

        <Select
          variant="outlined"
          id={label}
          name={name}
          label={label}
          value={!value ? '' : value}
          onChange={onChange}
          error={!!error}
          inputProps={{className: 'select'}}
          labelWidth={labelWidth}
          style={{minWidth: labelWidth + 40}}
        >
          <MenuItem value="">...</MenuItem>u

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
        {(options && options[value]) || emptyNode}
      </div>
    );
  }
);

export { EntityFieldReferenceSelect };
