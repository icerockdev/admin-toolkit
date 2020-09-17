import React, { FC } from 'react';
import styles from './styles.module.scss';

interface IProps {
  width?: string;
  isLoading?: boolean;
}

const Placeholder: FC<IProps> = ({
  width = `${Math.random() * 20 + 50}%`,
  children,
  isLoading = true,
}) =>
  isLoading ? (
    <div className={styles.placeholder} style={{ width }} />
  ) : (
    <>{children}</>
  );

export { Placeholder };
