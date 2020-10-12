/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { useCallback } from 'react';
import { TextField, WithStyles, withStyles } from '@material-ui/core';
import styles from './styles';

type IProps = WithStyles<typeof styles> & {
  label: string;
  value: any;
  onChange: (val: any) => void;
} & Record<string, any>;

const EntityFilterText = withStyles(styles)(
  ({ classes, label, value, onChange }: IProps) => {
    const onInput = useCallback((event) => onChange(event.target.value), [
      onChange,
    ]);

    return (
      <TextField
        onChange={onInput}
        value={value}
        name="field"
        label={label}
        variant="outlined"
        className={classes.input}
        autoFocus
      />
    );
  }
);

export { EntityFilterText };
