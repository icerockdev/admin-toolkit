import React, { FC, useMemo } from 'react';
import { CrudlField } from '~/application/modules/pages/CrudlEntity/items/CrudlField';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { ENTITY_SORT_DIRS } from '~/application';

interface IProps {
  field: CrudlField<any>;
}

const CrudlListTheadItem: FC<IProps> = ({ field }) => {
  const label = useMemo(() => field.options.label || field.name, [field]);

  return (
    <TableCell>
      <TableSortLabel
        active={false}
        direction={ENTITY_SORT_DIRS.DESC}
        onClick={console.log}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );
};

export { CrudlListTheadItem };
