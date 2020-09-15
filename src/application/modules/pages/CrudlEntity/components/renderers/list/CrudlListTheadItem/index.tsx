import React, { FC, useCallback, useMemo } from 'react';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { useEntity } from '~/utils/hooks';
import { SortDir } from '~/application/modules/pages/CrudlEntity/types';
import { observer } from 'mobx-react';
import classNames from 'classnames';

interface IProps {
  field: CrudlField<any>;
}

const CrudlListTheadItem: FC<IProps> = observer(({ field }) => {
  const entity = useEntity();
  const sortable = field.options.features?.sort;

  const onSortChange = useCallback(() => {
    const { sortDir, sortBy } = entity.data;

    if (sortBy === field.name) {
      entity.data.sortDir = sortDir === SortDir.ASC ? SortDir.DESC : undefined;

      if (sortDir === SortDir.DESC) {
        entity.data.sortBy = undefined;
      }

      return;
    }

    entity.data.sortDir = SortDir.ASC;
    entity.data.sortBy = field.name.toString();
  }, [entity.data, field]);

  const { sortDir, sortBy } = entity.data;

  return (
    <TableCell
      className={classNames(
        'crudl-list__table-head-field',
        `crudl-list__table-head-field_${field.name}`
      )}
    >
      {sortable ? (
        <TableSortLabel
          active={sortBy === field.name}
          direction={sortDir}
          onClick={onSortChange}
        >
          <field.ListHead />
        </TableSortLabel>
      ) : (
        <field.ListHead />
      )}
    </TableCell>
  );
});

export { CrudlListTheadItem };
