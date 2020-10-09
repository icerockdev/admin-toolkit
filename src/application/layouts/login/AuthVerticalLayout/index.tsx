import React, { FC } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import { useConfig } from '~/utils/hooks';
import { Link } from 'react-router-dom';

interface IProps {}

const AuthVerticalLayout: FC<IProps> = observer(({ children }) => {
  const config = useConfig();

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={config.logo} alt={config.title} />
          </Link>
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
