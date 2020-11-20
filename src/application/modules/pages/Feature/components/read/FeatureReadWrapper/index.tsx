/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useFeature } from '~/application/utils/hooks';

const FeatureReadWrapper: FC = ({ children }) => {
  const feature = useFeature();
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!feature.isEditing) return;

      feature.controller.submitItem();
    },
    [feature]
  );

  return (
    <form
      className={classNames(styles.wrap, 'feature-read__wrapper')}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export { FeatureReadWrapper };
