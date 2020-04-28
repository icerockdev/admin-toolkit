/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, {
  FC,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

type IProps = {
  label: string;
  value: any;
  isEditing?: boolean;
  handler?: (val: any) => void;
  error?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  options?: Record<any, any>;
} & Record<string, any>;

const EntityFieldReferenceSelect: FC<IProps> = observer(
  ({ label, value, handler, error, isEditing, onClick, options }) => {
    const ref = useRef<HTMLLabelElement>(null);

    const onChange = useCallback(
      (event) => {
        if (!handler) return;
        handler(event.target.value);
      },
      [value, handler]
    );

    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => {
      setLabelWidth((ref.current && ref.current.clientWidth) || 0);
    }, [ref.current]);

    return isEditing ? (
      <FormControl variant="outlined">
        <InputLabel htmlFor={label} style={{ whiteSpace: 'nowrap' }} ref={ref}>
          {label}
        </InputLabel>

        <Select
          variant="outlined"
          id={label}
          name={label}
          label={label}
          value={!value ? '' : value}
          onChange={onChange}
          error={!!error}
          inputProps={{ className: 'select' }}
          labelWidth={labelWidth}
          style={{ minWidth: labelWidth + 40 }}
        >
          <MenuItem value="">...</MenuItem>

          {options &&
            options.referenceData &&
            Object.keys(options.referenceData).map((item) => (
              <MenuItem key={item} value={item}>
                {options.referenceData[item]}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    ) : (
      <div onClick={onClick}>
        {(options && options.referenceData && options.referenceData[value]) || (
          <div>&nbsp;</div>
        )}
      </div>
    );
  }
);

export { EntityFieldReferenceSelect };
