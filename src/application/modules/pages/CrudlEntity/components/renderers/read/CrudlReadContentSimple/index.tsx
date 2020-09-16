import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useEntity } from '~/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface IProps {}

const CrudlReadContentSimple: FC<IProps> = observer(() => {
  const entity = useEntity();

  const fields = useMemo(() => {
    return entity.fieldsList.filter((field) => field.showInRead);
  }, [entity.fieldsList]);

  const values = useMemo(() => entity.data.read, [entity.data.read]);

  return (
    <div className={classNames(styles.list, 'crudl-read__simple-list')}>
      {fields.map((field) => (
        <div
          key={field.label}
          className={classNames(styles.field, 'crudl-read__simple-field')}
        >
          <div className={classNames(styles.label, 'crudl-read__simple-label')}>
            {field.label}
          </div>

          <div className={classNames(styles.label, 'crudl-read__simple-value')}>
            {!!values[field.name] ? (
              <field.Read
                name={field.name}
                label={field.options.label}
                value={values[field.name]}
              />
            ) : (
              <div>&mdash;</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

export { CrudlReadContentSimple };
