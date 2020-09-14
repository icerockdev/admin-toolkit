import React, { FC } from 'react';
import styles from './styles.module.scss';

interface IProps {
  width?: string;
}

const Placeholder: FC<IProps> = ({ width = `${Math.random() * 20 + 50}%` }) => (
  <div className={styles.placeholder} style={{ width }} />
);

export { Placeholder };
