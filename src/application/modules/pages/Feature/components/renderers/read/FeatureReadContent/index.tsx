import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useFeature } from '~/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';
import { FeatureReadField } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadField';

interface IProps {
  onlyFields?: string[];
}

const FeatureReadContent: FC<IProps> = observer(({ onlyFields }) => {
  const feature = useFeature();

  const fields = useMemo(() => {
    return feature.fieldsList.filter(
      (field) =>
        field.showInRead && (!onlyFields || onlyFields.includes(field.name))
    );
  }, [feature.fieldsList, onlyFields]);

  const values = useMemo(() => feature.data.read, [feature.data.read]);

  return (
    <div className={classNames(styles.list, 'feature-read__content')}>
      {fields.map((field) => (
        <FeatureReadField label={field.label} key={field.key}>
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
