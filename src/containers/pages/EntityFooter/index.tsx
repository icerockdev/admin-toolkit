/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback } from 'react';
import { Paper, TablePagination } from '@material-ui/core';

interface IProps {
  itemsPerPage: number[];
  items: number;
  totalCount: number;
  page: number;
  setPage: (count: number) => void;
  setPerPage: (count: number) => void;
}

const EntityFooter: FC<IProps> = ({
  totalCount,
  page,
  itemsPerPage,
  items,
  setPage,
  setPerPage,
}) => {
  const onChangeRowsPerPage = useCallback(
    event => setPerPage(parseInt(event.target.value)),
    [setPerPage]
  );

  const onChangePage = useCallback((_, newPage) => setPage(newPage), [setPage]);

  return (
    <Paper>
      <TablePagination
        rowsPerPageOptions={itemsPerPage}
        component="div"
        count={totalCount}
        labelRowsPerPage="На странице:"
        rowsPerPage={items}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Paper>
  );
};

export { EntityFooter };
