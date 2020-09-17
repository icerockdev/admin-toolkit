import React, { useCallback, useMemo } from 'react';
import { useFeature } from '~/utils/hooks';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { equals, omit, reject } from 'ramda';
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

  const onFieldChange = useCallback(
    (name: string, value: any) => {
      feature.filters.value = { ...feature.filters.value, [name]: value };
    },
    [feature.filters.value]
  );

  const onFieldReset = useCallback(
    (name: string) => {
      feature.filters.value = omit([name], feature.filters.value);
      feature.filters.selected = reject(equals(name), feature.filters.selected);
    },
    [feature.filters.value]
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
        <field.Filter
          onReset={onFieldReset}
          onChange={onFieldChange}
          value={feature.filters.value[field.name] || ''}
          key={field.name}
        />
      ))}
    </div>
  );
});

export { FiltersRenderer };
