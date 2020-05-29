/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback } from 'react';
import { TablePagination, WithStyles, withStyles } from '@material-ui/core';
import styles from './styles';

type IProps = WithStyles<typeof styles> & {
  itemsPerPage: number[];
  items: number;
  totalCount: number;
  page: number;
  setPage: (count: number) => void;
  setPerPage: (count: number) => void;
};

const EntityFooterUnconnected: FC<IProps> = ({
  classes,
  totalCount,
  page,
  itemsPerPage,
  items,
  setPage,
  setPerPage,
}) => {
  const onChangeRowsPerPage = useCallback(
    (event) => setPerPage(parseInt(event.target.value)),
    [setPerPage]
  );

  const onChangePage = useCallback((_, newPage) => setPage(newPage), [setPage]);

  return (
    <TablePagination
      rowsPerPageOptions={itemsPerPage}
      component="div"
      count={totalCount}
      labelRowsPerPage="На странице:"
      rowsPerPage={items}
      page={page}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      className={classes.pager}
    />
  );
};

const EntityFooter = withStyles(styles)(EntityFooterUnconnected);

export { EntityFooter };
