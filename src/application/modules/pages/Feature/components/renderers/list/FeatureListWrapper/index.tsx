import React, { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const FeatureListWrapper: FC = ({ children }) => (
  <div className={classNames(styles.wrap, 'feature-list__wrapper')}>
    {children}
  </div>
);

export { FeatureListWrapper };
