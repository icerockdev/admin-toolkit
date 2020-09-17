import React, { createElement, FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useFeature } from '~/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';
import { FeatureReadField } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadField';
import { FeatureMode } from '~/application/modules/pages/Feature/types';
import { FeatureField } from '~/application/modules/pages/Feature/components/fields/FeatureField';
import { has } from 'ramda';

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

  const component = useCallback(
    (field: FeatureField) => {
      switch (feature.mode) {
        case FeatureMode.read:
          return field.Read;
        case FeatureMode.create:
          return field.Create;
        case FeatureMode.update:
          return field.Update;
        default:
          return field.List;
      }
    },
    [feature.mode]
  );

  const isEditing =
    feature.mode === FeatureMode.create || feature.mode === FeatureMode.update;

  return (
    <div className={classNames(styles.list, 'feature-read__content')}>
      {fields.map((field) => (
        <FeatureReadField
          label={field.label}
          key={field.key}
          hideLabel={isEditing}
          disabled={
            feature.mode === FeatureMode.read && !has(field.name, values)
          }
        >
          {createElement(component(field), {
            value: values[field.name],
          })}
        </FeatureReadField>
      ))}
    </div>
  );
});

export { FeatureReadContent };
