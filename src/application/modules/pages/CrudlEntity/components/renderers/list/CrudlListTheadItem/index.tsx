import React, { FC, useCallback, useMemo } from 'react';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { useEntity } from '~/utils/hooks';
import { SortDir } from '~/application/modules/pages/CrudlEntity/types';
import { observer } from 'mobx-react';

interface IProps {
  field: CrudlField<any>;
}

const CrudlListTheadItem: FC<IProps> = observer(({ field }) => {
  const entity = useEntity();
  const label = useMemo(() => field.options.label || field.name, [field]);
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
    <TableCell>
      {sortable ? (
        <TableSortLabel
          active={sortBy === field.name}
          direction={sortDir}
          onClick={onSortChange}
        >
          {label}
        </TableSortLabel>
      ) : (
        label
      )}
    </TableCell>
  );
});

export { CrudlListTheadItem };
