import React, { FC, useMemo } from 'react';
import { useEntity } from '~/utils/hooks';
import { CrudlListTheadItem } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListTheadItem';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { CrudlListEmptyRows } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListEmptyRows';
import { Table, TableBody, TableHead } from '@material-ui/core';

interface IProps {}

const CrudlListTable: FC<IProps> = observer(() => {
  const entity = useEntity();

  const fields = useMemo(() => {
    return entity.fieldsList.filter((field) => field.showInList);
  }, [entity.fields]);

  const {
    storage: { isLoading, list },
    rows,
  } = entity;

  console.log({ isLoading }, fields.length);

  return (
    <Table className={classNames(styles.table, 'crudl-list__table')}>
      <TableHead>
        {fields.map((field) => (
          <CrudlListTheadItem field={field} key={field.name} />
        ))}
      </TableHead>

      <TableBody>
        {isLoading ? (
          <CrudlListEmptyRows rows={rows} cols={fields.length} />
        ) : (
          <div>ROWS</div>
        )}
      </TableBody>
    </Table>
  );
});

export { CrudlListTable };
