import React, { FC, HTMLAttributes, useCallback } from 'react';
import { TableCell, TableSortLabel } from '@material-ui/core';

type IProps = HTMLAttributes<HTMLDivElement> & {
  field: string;
  active?: boolean;
  direction?: 'desc' | 'asc';
  onSortChange: (field: string) => void;
};

const EntityHeadSortable: FC<IProps> = ({
  children,
  field,
  active,
  onSortChange,
  direction,
}) => {
  const onClick = useCallback(() => onSortChange(field), [field, onSortChange]);

  return (
    <TableCell>
      <TableSortLabel active={active} direction={direction} onClick={onClick}>
        {children}
      </TableSortLabel>
    </TableCell>
  );
};

export { EntityHeadSortable };
