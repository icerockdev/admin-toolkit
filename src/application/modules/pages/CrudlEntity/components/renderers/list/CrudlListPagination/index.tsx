import React, { FC, useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { TablePagination } from '@material-ui/core';
import { useEntity } from '~/utils/hooks';
import { observer } from 'mobx-react';

interface IProps {}

const CrudlListPagination: FC<IProps> = observer(() => {
  const entity = useEntity();
  const { rows, page, count, rowsSelectOptions } = entity.filters;

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
      entity.filters.rows = event.target.value;
    },
    [entity.filters]
  );

  const onPageChange = useCallback(
    (_, val: number) => {
      entity.filters.page = val;
    },
    [entity.filters]
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
