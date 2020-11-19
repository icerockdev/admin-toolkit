/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';

interface IProps {
  label: string;
  hideLabel?: boolean;
  disabled?: boolean;
}

const FeatureReadField: FC<IProps> = ({
  label,
  disabled,
  hideLabel,
  children,
}) => (
  <div className={classNames(styles.field, 'feature-read__field')}>
    {!hideLabel && (
      <div className={classNames(styles.label, 'feature-read__field-label')}>
        {label}
      </div>
    )}

    <Placeholder width="56px" isLoading={disabled}>
      <div className={classNames(styles.value, 'feature-read__field-value')}>
        {children}
      </div>
    </Placeholder>
  </div>
);

export { FeatureReadField };
