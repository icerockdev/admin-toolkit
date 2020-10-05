import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import { HorizontalNavigation } from '~/containers/layout/HorizontalNavigation';
import { useConfig } from '~/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface IProps {}

const HorizontalLayout: FC<IProps> = observer(({ children }) => {
  const config = useConfig();

  const links = useMemo(
    () =>
      config.pages
        .filter((page) => page?.menu?.url && page.canList)
        .map((page) => ({
          name: page.menu.label,
          url: page.menu.url,
        })),
    [config, config.pages, config.auth?.user?.role]
  );

  const role = useMemo(
    () =>
      (config.auth?.roleTitles &&
        config.auth?.user?.role &&
        config.auth?.roleTitles[config.auth?.user?.role]) ||
      config.auth?.user?.role,
    [config.auth?.roleTitles, config.auth?.user?.role]
  );

  return (
    <div className={classNames(styles.layout, 'horizontal-layout')}>
      <div
        className={classNames(
          styles.navigation,
          'horizontal-layout__navigation'
        )}
      >
        <HorizontalNavigation
          links={links}
          logo={{ url: config.logo, title: config.title }}
          account={{
            email: config.auth?.user?.email || '',
            username: config.auth?.user?.username || '',
            role,
          }}
          onLogout={config.auth?.logout}
        />
      </div>

      <div className={classNames(styles.wrapper, 'horizontal-layout__wrapper')}>
        {children}
      </div>
    </div>
  );
});

export { HorizontalLayout };
