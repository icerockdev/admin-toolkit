import React, { FC } from 'react';
import styles from './styles.module.scss';
import { observer } from 'mobx-react';

interface IProps {
  width?: string | number;
  height?: string | number;
  isLoading?: boolean;
}

const Placeholder: FC<IProps> = observer(
  ({
    width = `${Math.random() * 20 + 50}%`,
    height = '1em',
    children,
    isLoading = true,
  }) =>
    isLoading ? (
      <div className={styles.placeholder} style={{ width, height }} />
    ) : (
      <>{children}</>
    )
);

export { Placeholder };
