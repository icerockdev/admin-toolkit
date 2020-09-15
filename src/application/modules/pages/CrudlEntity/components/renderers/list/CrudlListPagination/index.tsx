import React, { FC, useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { TablePagination } from '@material-ui/core';
import { useEntity } from '~/utils/hooks';
import { observer } from 'mobx-react';

interface IProps {}

const CrudlListPagination: FC<IProps> = observer(() => {
  const { data } = useEntity();
  const { rows, page, count, rowsSelectOptions } = data;

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
      data.rows = event.target.value;
    },
    [data]
  );

  const onPageChange = useCallback(
    (_, val: number) => {
      data.page = val;
    },
    [data]
  );

  return (
    <>
      <div
        className={classNames(
          styles.placeholder,
          'crudl-list__pagination-placeholder'
        )}
      />

      <div
        className={classNames(styles.floater, 'crudl-list__pagination_floater')}
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
    </>
  );
});

export { CrudlListPagination };
