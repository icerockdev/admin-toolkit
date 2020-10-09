import React, { FC } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import { useConfig } from '~/utils/hooks';

interface IProps {}

const AuthVerticalLayout: FC<IProps> = observer(({ children }) => {
  const config = useConfig();

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src={config.logo} alt={config.title} />
        </div>

        <div className={styles.form}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>

      <div className="image" />
    </div>
  );
});

export { AuthVerticalLayout };
