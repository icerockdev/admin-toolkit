/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { useCallback, Fragment, useMemo, useState } from 'react';

import {
  withStyles,
  WithStyles,
  MenuItem,
  IconButton,
  Menu,
  ListItemText,
  Button,
} from '@material-ui/core';

import styles from './styles';
import { IEntityProps, IFilterValue } from '~/application/types/entity';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import FilterIcon from '@material-ui/icons/FilterList';
import { EntityField } from '~/application/modules/pages/Entity/components/EntityField';
import { observer } from 'mobx-react';
import { Entity } from '~/application';
import { toJS } from 'mobx';

type IProps = WithStyles<typeof styles> & {
  fields: IEntityProps['fields'];
  filters: IFilterValue[];
  filterData: Record<string, any>;
  entity: Entity;

  clearFilter: () => void;
  applyFilter: () => void;
  setFilters: (filters: IFilterValue[]) => void;
  withToken?: (req: any, args: any) => void;
};

const Filter = withStyles(styles)(
  observer(
    ({
      classes,
      fields,
      filters,
      filterData,
      setFilters,
      applyFilter,
      withToken,
      entity,
    }: IProps) => {
      const [buttonRef, setButtonRef] = useState<any>(null);

      const onSelectField = useCallback(
        (value) => {
          setFilters([...filters, { name: String(value), value: '' }]);
          setButtonRef(null);
        },
        [setButtonRef, setFilters, filters]
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
          applyFilter();
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

      const onCancel = useCallback(
        (event) => {
          event.preventDefault();
          setFilters([]);
          applyFilter();
        },
        [applyFilter]
      );

      const onSubmit = useCallback(
        (event) => {
          event.preventDefault();
          applyFilter();
        },
        [applyFilter]
      );

      const onMenuOpen = useCallback((event) => setButtonRef(event.target), [
        setButtonRef,
      ]);

      const onMenuClose = useCallback((event) => setButtonRef(null), [
        setButtonRef,
      ]);

      return (
        <form className={classes.wrapper} onSubmit={onSubmit}>
          {selectableFields.length > 0 && (
            <>
              <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="outlined"
                color="primary"
                onClick={onMenuOpen}
                className={classes.filterButton}
              >
                <FilterIcon />
              </Button>

              {buttonRef && (
                <Menu
                  id="customized-menu"
                  elevation={0}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  anchorEl={buttonRef}
                  onClose={onMenuClose}
                  open={!!buttonRef}
                >
                  {selectableFields.map((field) => (
                    <MenuItem
                      key={field.name}
                      onClick={() => onSelectField(field.name)}
                    >
                      <ListItemText primary={field.label || field.name} />
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </>
          )}

          {currentFilters.length > 0 && (
            <Fragment>
              <Button
                onClick={applyFilter}
                tabIndex={0}
                color="primary"
                variant="outlined"
                className={classes.filterButton}
              >
                <CheckIcon />
              </Button>
            </Fragment>
          )}

          {currentFilters.length > 0 && (
            <Fragment>
              <Button
                onClick={onCancel}
                tabIndex={0}
                color="secondary"
                variant="outlined"
                className={classes.filterButton}
              >
                <ClearIcon />
              </Button>
            </Fragment>
          )}

          {currentFilters.map(
            (field, i) =>
              field && (
                <div className={classes.input} key={field.name}>
                  <EntityField
                    name={field.name}
                    fields={fields}
                    data={{ ...filterData, [field.name]: filters[i].value }}
                    handler={setFilterValue(i)}
                    withToken={withToken}
                    entity={entity}
                    isEditing
                    isFiltering
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
        </form>
      );
    }
  )
);

export { Filter };
