/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, HTMLAttributes, useCallback } from 'react';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { ENTITY_SORT_DIRS } from '~/application';

type IProps = HTMLAttributes<HTMLDivElement> & {
  field: string;
  active?: boolean;
  direction?: typeof ENTITY_SORT_DIRS[keyof typeof ENTITY_SORT_DIRS];
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
      <TableSortLabel
        active={active}
        direction={active ? direction : ENTITY_SORT_DIRS.DESC}
        onClick={onClick}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  );
};

export { EntityHeadSortable };
