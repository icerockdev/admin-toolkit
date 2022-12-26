/* Copyright (c) 2020-2022 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { TablePagination } from '@material-ui/core';
import { useFeature } from '~/application/utils/hooks';
import { observer } from 'mobx-react';

interface IProps {}

const FeatureListPagination: FC<IProps> = observer(() => {
  const { t } = useTranslation();
  const feature = useFeature();
  const { rows, page, count, rowsSelectOptions } = feature.filters;

  const labelDisplayedRows = useCallback(
    ({ from, to, count }: { from: number; to: number; count: number }) => {
      const pageNum = page + 1;
      const pageCount = Math.ceil(count / rows);

      return t(
        'messages:Page {{pageNum}} of {{pageCount}}, Results {{from}}-{{to}} of {{count}}',
        {
          pageNum,
          pageCount,
          from,
          to,
          count,
        }
      );
    },
    [page, count, rows]
  );

  const onRowsChange = useCallback(
    (event) => {
      feature.filters.rows = event.target.value;
    },
    [feature.filters]
  );

  const onPageChange = useCallback(
    (_, val: number) => {
      feature.filters.page = val;
    },
    [feature.filters]
  );

  if (count === 0) return <Fragment />;

  return (
    <div
      className={classNames(
        styles.pagination,
        'feature-list__pagination_pagination'
      )}
    >
      <TablePagination
        rowsPerPageOptions={rowsSelectOptions}
        component="div"
        count={count}
        labelRowsPerPage={`${t('common:Per page')}:`}
        rowsPerPage={rows}
        page={page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onRowsChange}
        labelDisplayedRows={labelDisplayedRows}
      />
    </div>
  );
});

export { FeatureListPagination };
