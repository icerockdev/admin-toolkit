import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Close } from '@material-ui/icons';

interface IProps {
  onClear: () => void;
}

const CrudlFilterWrapper: FC<IProps> = ({ onClear, children }) => (
  <div className={styles.filter}>
    <div className={styles.input}>{children}</div>

    <div className={styles.close} onClick={onClear}>
      <Close />
    </div>
  </div>
);

export { CrudlFilterWrapper };
