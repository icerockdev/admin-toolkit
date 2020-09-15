import React, { Fragment, useCallback, useMemo } from 'react';
import { useEntity } from '~/utils/hooks';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { omit } from 'ramda';

const CrudlFiltersRenderer = observer(() => {
  const entity = useEntity();
  const fields = useMemo(
    () => entity.fieldsList.filter((field) => field.options.features?.filter),
    [entity.fieldsList]
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
    },
    [entity.filters.value]
  );

  if (!fields.length) return <Fragment />;

  return (
    <div className={classNames(styles.filters, 'crudl-list__filters')}>
      {fields.map((field, i) => (
        <field.Filter
          label={field.label}
          name={field.name}
          onReset={onFieldReset}
          onChange={onFieldChange}
          value={entity.filters.value[field.name] || ''}
          key={field.name}
        />
      ))}
    </div>
  );
});

export { CrudlFiltersRenderer };
