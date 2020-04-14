/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, ReactElement } from 'react';
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
  title: ReactElement;
  buttons: ReactElement;
  canCreate: boolean;
  url: string;
  filters: IEntityProps['filters'];
  fields: IEntityProps['fields'];
  filterData: Record<string, any>;
  setFilters: (filters: IEntityProps['filters']) => void;
  applyFilter: () => void;
  withToken?: (req: any, args: any) => void;
};

const EntityHeadUnstyled: FC<IProps> = ({
  classes,
  title,
  buttons,
  filters,
  fields,
  canCreate,
  url,
  filterData,

  setFilters,
  applyFilter,
  withToken,
}) => {
  const clearFilter = useCallback(() => {
    setFilters([]);
    applyFilter();
  }, [setFilters, filters, applyFilter]);

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.header}
    >
      {title}

      {filters && (
        <Filter
          filterData={filterData}
          fields={fields}
          filters={filters}
          setFilters={setFilters}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
          withToken={withToken}
        />
      )}

      {buttons && <div className={classes.buttons}>{buttons}</div>}

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
