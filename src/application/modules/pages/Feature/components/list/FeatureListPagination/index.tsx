import React, { FC, useCallback } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { TablePagination } from '@material-ui/core';
import { useFeature } from '~/application/utils/hooks';
import { observer } from 'mobx-react';

interface IProps {}

const FeatureListPagination: FC<IProps> = observer(() => {
  const feature = useFeature();
  const { rows, page, count, rowsSelectOptions } = feature.filters;

  const labelDisplayedRows = useCallback(
    ({ from, to, count }: { from: number; to: number; count: number }) => {
      const totalPages = Math.ceil(count / rows);

      return `Страница ${
        page + 1
      } из ${totalPages}, Результаты ${from}-${to} из ${count}`;
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
        labelRowsPerPage="На странице:"
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
