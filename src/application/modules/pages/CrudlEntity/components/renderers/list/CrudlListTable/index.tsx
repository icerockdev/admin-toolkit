import React, { FC, useMemo } from 'react';
import { useEntity } from '~/utils/hooks';
import { CrudlListTheadItem } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListTheadItem';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { CrudlListEmptyRows } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListEmptyRows';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { CrudlListRow } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListRow';

interface IProps {}

const CrudlListTable: FC<IProps> = observer(() => {
  const entity = useEntity();

  const fields = useMemo(() => {
    return entity.fieldsList.filter((field) => field.showInList);
  }, [entity.fields]);

  const {
    data: { isLoading, list, rows },
  } = entity;

  return (
    <TableContainer component={Paper} className={styles.container}>
      <Table
        className={classNames(styles.table, 'crudl-list__table')}
        size="medium"
      >
        <TableHead>
          <TableRow className="crudl-list__table-head-row">
            {fields.map((field) => (
              <CrudlListTheadItem field={field} key={field.name.toString()} />
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading && <CrudlListEmptyRows rows={rows} cols={fields.length} />}

          {!isLoading &&
            !!list &&
            list.map((item: Record<string, any>, i: number) => (
              <CrudlListRow values={item} key={`${item.id}-${i}`} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export { CrudlListTable };
