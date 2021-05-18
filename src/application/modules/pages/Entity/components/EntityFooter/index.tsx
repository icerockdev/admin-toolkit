/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback } from 'react';
import { TablePagination, WithStyles, withStyles } from '@material-ui/core';
import styles from './styles';
import { useTranslation } from "react-i18next";

type IProps = WithStyles<typeof styles> & {
  itemsPerPage: number[];
  items: number;
  totalCount: number;
  page: number;
  setPage: (count: number) => void;
  setPerPage: (count: number) => void;
};

type PageNumbers = {
  from: number;
  to: number;
  count: number;
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
  const {t} = useTranslation()
  const onChangeRowsPerPage = useCallback(
    (event) => setPerPage(parseInt(event.target.value)),
    [setPerPage]
  );

  const onChangePage = useCallback((_, newPage) => setPage(newPage), [setPage]);

  const labelDisplayedRows = (page: number, items: number) => ({from, to, count}: PageNumbers) => {
    const pageNum = page + 1
    const pageCount = Math.ceil(count / items)

    console.log({
      pageNum,
      pageCount,
      from,
      to,
      count
    })

    return t('Page {{pageNum}} of {{pageCount}}, Results {{from}}-{{to}} of {{count}}', {
      pageNum,
      pageCount,
      from,
      to,
      count
    })
  };

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
      labelDisplayedRows={labelDisplayedRows(page, items)}
    />
  );
};

const EntityFooter = withStyles(styles)(EntityFooterUnconnected);

export { EntityFooter };
