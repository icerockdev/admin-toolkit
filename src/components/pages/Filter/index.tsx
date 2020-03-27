/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { ChangeEvent, useCallback, Fragment, useMemo } from 'react';

import {
  withStyles,
  WithStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';

import styles from './styles';
import { ENTITY_FILTER_TYPES } from '~/application/types/entity';
import { FilterText } from '../FilterText';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

type IProps = WithStyles<typeof styles> & {
  current: string;
  value: any;
  fields: {
    name: string;
    label?: string;
    type: string;
    variants?: { label: string | number; value: string }[];
  }[];

  clearFilter: () => void;
  applyFilter: () => void;
  setFilterCurrent: (current: string) => void;
  setFilterValue: (value: any) => void;
};

const FILTER_RENDERERS = {
  [ENTITY_FILTER_TYPES.TEXT]: FilterText,
};

const Filter = withStyles(styles)(
  ({
    classes,
    current,
    value,
    fields,
    clearFilter,
    setFilterCurrent,
    setFilterValue,
    applyFilter,
  }: IProps) => {
    const onChangeField = useCallback(
      (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
        setFilterCurrent(String(event.target.value));
      },
      [setFilterCurrent]
    );

    const onResetFilter = useCallback(() => {
      clearFilter();
    }, [clearFilter]);

    const field = useMemo(
      () => (current && fields.find(field => field.name === current)) || null,
      [fields, current]
    );

    return (
      <div className={classes.wrapper}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="field" className={classes.label}>
            Фильтр
          </InputLabel>

          <Select
            variant="outlined"
            id="field"
            name="field"
            value={current}
            onChange={onChangeField}
            className={classes.select}
          >
            <MenuItem value="">...</MenuItem>

            {fields.map(field => (
              <MenuItem key={field.name} value={field.name}>
                {field.label || field.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {field && (
          <Fragment>
            {React.createElement(FILTER_RENDERERS[field.type] || FilterText, {
              label: field.label || field.name,
              value,
              variants: field.variants || [],
              onChange: setFilterValue,
            })}

            <IconButton
              color="secondary"
              onClick={onResetFilter}
              className={classes.iconButton}
            >
              <ClearIcon />
            </IconButton>

            <IconButton
              disabled={!value}
              color="primary"
              onClick={applyFilter}
              className={classes.iconButton}
            >
              <CheckIcon />
            </IconButton>
          </Fragment>
        )}
      </div>
    );
  }
);

export { Filter };
