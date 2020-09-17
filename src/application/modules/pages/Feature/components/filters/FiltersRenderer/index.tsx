import React, { useCallback, useMemo } from 'react';
import { useEntity } from '~/utils/hooks';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { equals, omit, reject } from 'ramda';
import { FilterSelector } from '~/application/modules/pages/Feature/components/filters/FilterSelector';

const FiltersRenderer = observer(() => {
  const entity = useEntity();
  const filterable = useMemo(
    () => entity.fieldsList.filter((field) => field.options.features?.filter),
    [entity.fieldsList]
  );

  const selected = useMemo(
    () =>
      filterable.filter((field) =>
        entity.filters.selected.includes(field.name)
      ),
    [filterable, entity.filters.selected]
  );

  const onFieldChange = useCallback(
    (name: string, value: any) => {
      entity.filters.value = { ...entity.filters.value, [name]: value };
    },
    [entity.filters.value]
  );

  const onFieldReset = useCallback(
    (name: string) => {
      entity.filters.value = omit([name], entity.filters.value);
      entity.filters.selected = reject(equals(name), entity.filters.selected);
    },
    [entity.filters.value]
  );

  const onAdd = useCallback(
    (name: string) => {
      entity.filters.selected = [...entity.filters.selected, name];
    },
    [entity.filters.selected]
  );

  return (
    <div className={classNames(styles.filters, 'feature-list__filters')}>
      <FilterSelector
        fields={filterable}
        onSelect={onAdd}
        selected={entity.filters.selected}
      />

      {selected.map((field, i) => (
        <field.Filter
          onReset={onFieldReset}
          onChange={onFieldChange}
          value={entity.filters.value[field.name] || ''}
          key={field.name}
        />
      ))}
    </div>
  );
});

export { FiltersRenderer };
