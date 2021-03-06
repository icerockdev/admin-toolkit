/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback } from 'react';
import { FeatureField } from '~/application/modules/pages/Feature/fields/FeatureField';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { useFeature } from '~/application/utils/hooks';
import { SortDir } from '~/application/modules/pages/Feature/types';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import styles from './styles.module.scss';

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
        `feature-list__table-head-field_${field.name}`,
        styles.thead
      )}
    >
      <div className={styles.label}>
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
      </div>
    </TableCell>
  );
});

export { FeatureListTheadItem };
