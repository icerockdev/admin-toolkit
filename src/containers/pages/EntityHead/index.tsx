/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback } from 'react';
import {
  Typography,
  withStyles,
  WithStyles,
  Grid,
  Button,
} from '@material-ui/core';
import styles from './styles';
import { Link as RouterLink } from 'react-router-dom';
import { IEntityProps } from '~/application';
import { Filter } from '~/components/pages/Filter';

type IProps = WithStyles<typeof styles> & {
  title: string;
  canCreate: boolean;
  url: string;
  filters: IEntityProps['filters'];
  fields: IEntityProps['fields'];
  setFilters: (filters: IEntityProps['filters']) => void;
  applyFilter: () => void;
};

const EntityHeadUnstyled: FC<IProps> = ({
  classes,
  title,
  filters,
  fields,
  canCreate,
  url,

  setFilters,
  applyFilter,
}) => {
  const setFilterCurrent = useCallback(
    (current: string) => {
      setFilters({ ...filters, current, value: null });

      if (current === '') {
        applyFilter();
      }
    },
    [setFilters, applyFilter, filters]
  );

  const setFilterValue = useCallback(
    (value: string) => setFilters({ ...filters, value }),
    [setFilters, filters]
  );

  const clearFilter = useCallback(() => {
    setFilters({ ...filters, current: '', value: '' });
    applyFilter();
  }, [setFilters, filters, applyFilter]);

  return (
    <Grid
      container
      justify="space-between"
      alignItems="flex-end"
      className={classes.header}
    >
      <Typography component="h3" className={classes.title}>
        {title}
      </Typography>

      {filters && (
        <Filter
          current={filters.current}
          value={filters.value}
          fields={fields}
          clearFilter={clearFilter}
          setFilterCurrent={setFilterCurrent}
          setFilterValue={setFilterValue}
          applyFilter={applyFilter}
        />
      )}

      {canCreate && url && (
        <Button
          type="button"
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`${url}/create`}
        >
          Создать
        </Button>
      )}
    </Grid>
  );
};

const EntityHead = withStyles(styles)(EntityHeadUnstyled);
export { EntityHead };
