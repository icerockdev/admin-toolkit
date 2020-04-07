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
import { IEntityProps, IFilterValue } from '~/application/types/entity';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { EntityField } from '~/application/components/EntityField';
import { toJS } from 'mobx';

type IProps = WithStyles<typeof styles> & {
  fields: IEntityProps['fields'];
  filters: IFilterValue[];

  clearFilter: () => void;
  applyFilter: () => void;
  setFilters: (filters: IFilterValue[]) => void;
};

const Filter = withStyles(styles)(
  ({
    classes,
    fields,
    filters,
    setFilters,
    clearFilter,
    applyFilter,
  }: IProps) => {
    const onSelectField = useCallback(
      (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
        if (!event.target.value) return;

        setFilters([
          ...filters,
          { name: String(event.target.value), value: '' },
        ]);
      },
      [setFilters, filters]
    );

    const setFilterValue = useCallback(
      (i: number) => (value: any) => {
        setFilters(
          filters.map((filter, index) =>
            i === index ? { ...filter, value } : filter
          )
        );
      },
      [filters, setFilters]
    );

    const removeFilter = useCallback(
      (i: number) => () => {
        setFilters(filters.filter((_, index) => i !== index));
      },
      [filters, setFilters]
    );

    const filterableFields = useMemo(
      () => fields.filter((field) => field.filterable),
      [fields]
    );

    const selectableFields = useMemo(
      () =>
        filterableFields.filter(
          (field) => !filters.some((filter) => filter.name === field.name)
        ),
      [filterableFields, filters]
    );

    const currentFilters = useMemo(
      () =>
        filters
          .map((filter) =>
            filterableFields.find((field) => field.name === filter.name)
          )
          .filter((field) => !!field) || [],
      [filterableFields, filters]
    );

    const onSubmit = useCallback(
      (event) => {
        event.preventDefault();
        applyFilter();
      },
      [applyFilter]
    );

    return (
      <form className={classes.wrapper} onSubmit={onSubmit}>
        {selectableFields.length > 0 && (
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="field" className={classes.label}>
              Фильтр
            </InputLabel>

            <Select
              variant="outlined"
              id="field"
              name="field"
              label="Фильтр"
              value=""
              onChange={onSelectField}
              className={classes.select}
            >
              <MenuItem value="">...</MenuItem>

              {selectableFields.map((field) => (
                <MenuItem key={field.name} value={field.name}>
                  {field.label || field.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {currentFilters.map(
          (field, i) =>
            field && (
              <div className={classes.input} key={field.name}>
                <EntityField
                  name={field.name}
                  fields={fields}
                  data={{ [field.name]: filters[i].value }}
                  handler={setFilterValue(i)}
                  isEditing
                />

                <IconButton
                  color="secondary"
                  onClick={removeFilter(i)}
                  className={classes.clear}
                  tabIndex={0}
                >
                  <ClearIcon />
                </IconButton>
              </div>
            )
        )}
        {currentFilters.length > 0 && (
          <Fragment>
            <IconButton
              color="primary"
              onClick={applyFilter}
              className={classes.iconButton}
              tabIndex={0}
            >
              <CheckIcon />
            </IconButton>
          </Fragment>
        )}
      </form>
    );
  }
);

export { Filter };
