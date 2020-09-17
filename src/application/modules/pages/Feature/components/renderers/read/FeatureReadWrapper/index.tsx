import React from 'react';
import { FeatureListRendererProps } from '~/application/modules/pages/Feature/types/renderer';
import styles from './styles.module.scss';
import classNames from 'classnames';

const FeatureReadWrapper: FeatureListRendererProps['wrapper'] = ({
  children,
}) => (
  <div className={classNames(styles.wrap, 'feature-read__wrapper')}>
    {children}
  </div>
);

export { FeatureReadWrapper };
