/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { useCallback, useMemo } from 'react';
import { useFeature } from '~/application/utils/hooks';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { FilterSelector } from '~/application/modules/pages/Feature/components/filters/FilterSelector';

const FiltersRenderer = observer(() => {
  const feature = useFeature();
  const filterable = useMemo(
    () => feature.fieldsList.filter((field) => field.options.features?.filter),
    [feature.fieldsList]
  );

  const selected = useMemo(
    () =>
      filterable.filter((field) =>
        feature.filters.selected.includes(field.name)
      ),
    [filterable, feature.filters.selected]
  );

  const onAdd = useCallback(
    (name: string) => {
      feature.filters.selected = [...feature.filters.selected, name];
    },
    [feature.filters.selected]
  );

  return (
    <div className={classNames(styles.filters, 'feature-list__filters')}>
      <FilterSelector
        fields={filterable}
        onSelect={onAdd}
        selected={feature.filters.selected}
      />

      {selected.map((field, i) => (
        <field.Filter key={field.name} />
      ))}
    </div>
  );
});

export { FiltersRenderer };
