/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const FeatureListWrapper: FC = ({ children }) => (
  <div className={classNames(styles.wrap, 'feature-list__wrapper')}>
    {children}
  </div>
);

export { FeatureListWrapper };
