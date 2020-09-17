import React, { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface IProps {
  label: string;
}

const FeatureReadField: FC<IProps> = ({ label, children }) => (
  <div className={classNames(styles.field, 'feature-read__field')}>
    <div className={classNames(styles.label, 'feature-read__field-label')}>
      {label}
    </div>

    <div className={classNames(styles.value, 'feature-read__field-value')}>
      {children}
    </div>
  </div>
);

export { FeatureReadField };
