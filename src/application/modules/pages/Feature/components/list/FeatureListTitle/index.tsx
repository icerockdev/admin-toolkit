/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC } from 'react';
import { useFeature } from '~/application/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';

const FeatureListTitle: FC = observer(() => {
  const feature = useFeature();

  return (
    <h1 className={classNames(styles.title, 'feature-list__title')}>
      {feature.title}
    </h1>
  );
});

export { FeatureListTitle };
