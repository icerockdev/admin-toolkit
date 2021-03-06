/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { createElement, FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useFeature } from '~/application/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { FeatureReadField } from '~/application/modules/pages/Feature/components/read/FeatureReadField';
import { FeatureMode } from '~/application/modules/pages/Feature/types';
import { FeatureField } from '~/application/modules/pages/Feature/fields/FeatureField';
import { has, hasPath } from 'ramda';

interface IProps {
  onlyFields?: string[];
}

const FeatureReadContent: FC<IProps> = observer(({ onlyFields }) => {
  const feature = useFeature();

  const fields = useMemo(() => {
    return onlyFields
      ? feature.fieldsOfCurrentMode.filter((field) =>
          onlyFields.includes(field.name)
        )
      : feature.fieldsOfCurrentMode;
  }, [feature.fieldsOfCurrentMode, onlyFields]);

  const values = useMemo(() => feature.data.read, [feature.data.read]);

  const component = useCallback(
    (field: FeatureField) => {
      switch (feature.mode) {
        case FeatureMode.create:
          return field.Create;
        case FeatureMode.update:
          return field.Update;
        default:
          return field.Read;
      }
    },
    [feature.mode]
  );

  const isEditing =
    feature.mode === FeatureMode.create || feature.mode === FeatureMode.update;

  return (
    <div className={classNames(styles.content, 'feature-read__content')}>
      {fields.map((field) => (
        <FeatureReadField
          label={field.label}
          key={field.key}
          hideLabel={isEditing}
          disabled={
            feature.mode === FeatureMode.read &&
            !hasPath(field.fieldPath, values)
          }
        >
          {component(field)}
        </FeatureReadField>
      ))}
    </div>
  );
});

export { FeatureReadContent };
