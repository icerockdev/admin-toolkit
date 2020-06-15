/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, ReactElement } from 'react';
import { withStyles, WithStyles, Grid, Button } from '@material-ui/core';
import styles from './styles';
import { Link as RouterLink } from 'react-router-dom';
import { IEntityProps } from '~/application';
import { Filter } from '~/components/pages/Filter';
import { Entity } from '~/application/modules';

type IProps = WithStyles<typeof styles> & {
  title: ReactElement;
  buttons: ReactElement;
  canCreate: boolean;
  canExport: boolean;
  url: string;
  filters: IEntityProps['filters'];
  fields: IEntityProps['fields'];
  filterData: Record<string, any>;
  entity: Entity;

  setFilters: (filters: IEntityProps['filters']) => void;
  applyFilter: () => void;
  onExport: () => void;
  withToken?: (req: any, args: any) => void;
};

const EntityHeadUnstyled: FC<IProps> = ({
  classes,
  title,
  buttons,
  filters,
  fields,
  canCreate,
  canExport,
  url,
  filterData,
  entity,

  setFilters,
  applyFilter,
  withToken,
  onExport,
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
          entity={entity}
        />
      )}

      <div className={classes.buttons}>
        {buttons}

        {canExport && (
          <Button
            variant="outlined"
            color="primary"
            onClick={onExport}
            className={classes.export}
          >
            Экспорт
          </Button>
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
      </div>
    </Grid>
  );
};

const EntityHead = withStyles(styles)(EntityHeadUnstyled);
export { EntityHead };
