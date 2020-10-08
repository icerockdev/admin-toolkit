import React, { FC } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useConfig } from '~/utils/hooks';
import { Link } from 'react-router-dom';
import { VerticalNavigation } from '~/containers/layout/VerticalNavigation';

interface IProps {}

const VerticalLayout: FC<IProps> = observer(({ children }) => {
  const config = useConfig();

  return (
    <div className={classNames(styles.layout, 'vertical-layout')}>
      <div className={classNames(styles.menu, 'vertical-layout__menu')}>
        <div className={classNames(styles.logo, 'vertical-layout__logo')}>
          <Link to={config.fallbackUrl}>
            <img src={config.logo} />
          </Link>
        </div>

        <div
          className={classNames(
            styles.navigation,
            'vertical-layout__navigation'
          )}
        >
          <VerticalNavigation />
        </div>

        {!!config.auth && (
          <div
            className={classNames(styles.profile, 'vertical-layout__profile')}
          >
            PROFILE
          </div>
        )}
      </div>

      <div className={classNames(styles.content, 'vertical-layout__content')}>
        {children}
      </div>
    </div>
  );
});

export { VerticalLayout };
