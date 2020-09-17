import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useEntity } from '~/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';
import { FeatureReadField } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadField';

interface IProps {
  onlyFields?: string[];
}

const FeatureReadContent: FC<IProps> = observer(({ onlyFields }) => {
  const entity = useEntity();

  const fields = useMemo(() => {
    return entity.fieldsList.filter(
      (field) =>
        field.showInRead && (!onlyFields || onlyFields.includes(field.name))
    );
  }, [entity.fieldsList, onlyFields]);

  const values = useMemo(() => entity.data.read, [entity.data.read]);

  return (
    <div className={classNames(styles.list, 'feature-read__content')}>
      {fields.map((field) => (
        <FeatureReadField label={field.label}>
          {!!values[field.name] ? (
            <field.Read
              name={field.name}
              label={field.options.label}
              value={values[field.name]}
            />
          ) : (
            <Placeholder width="30px" />
          )}
        </FeatureReadField>
      ))}
    </div>
  );
});

export { FeatureReadContent };
