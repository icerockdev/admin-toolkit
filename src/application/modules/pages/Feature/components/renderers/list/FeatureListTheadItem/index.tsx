import React, { FC, useCallback } from 'react';
import { FeatureField } from '~/application/modules/pages/Feature/items/FeatureField';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { useFeature } from '~/utils/hooks';
import { SortDir } from '~/application/modules/pages/Feature/types';
import { observer } from 'mobx-react';
import classNames from 'classnames';

interface IProps {
  field: FeatureField<any>;
}

const FeatureListTheadItem: FC<IProps> = observer(({ field }) => {
  const feature = useFeature();
  const sortable = field.options.features?.sort;

  const onSortChange = useCallback(() => {
    const { sortDir, sortBy } = feature.filters;

    if (sortBy === field.name) {
      feature.filters.sortDir =
        sortDir === SortDir.ASC ? SortDir.DESC : undefined;

      if (sortDir === SortDir.DESC) {
        feature.filters.sortBy = undefined;
      }

      return;
    }

    feature.filters.sortDir = SortDir.ASC;
    feature.filters.sortBy = field.name.toString();
  }, [feature.filters, field]);

  const { sortDir, sortBy } = feature.filters;

  return (
    <TableCell
      className={classNames(
        'feature-list__table-head-field',
        `feature-list__table-head-field_${field.name}`
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

export { FeatureListTheadItem };
