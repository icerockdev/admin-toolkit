/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './styles';
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { Account } from '~/containers/auth/Account';
import classnames from 'classnames';
import { useLocation } from 'react-router';
import { useConfig } from '~/application/utils/hooks';
import { useTranslation } from "react-i18next";

type IProps = WithStyles<typeof styles> & {};

const HorizontalNavigationUnstyled: FC<IProps> = ({ classes }) => {
  const config = useConfig();
  const {t} = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const wrapper = useRef<HTMLDivElement>(null);
  const appbar = useRef<HTMLDivElement>(null);

  let links: { name: string; url: string }[];
  links = useMemo(
    () =>
      config.pages
        .filter((page) => page?.menu?.url && page.canList)
        .map((page) => ({
          name: t(page.menu.label),
          url: page.menu.url,
        })),
    [config.pages, t]
  );

  const onTabChange = useCallback((_, tab) => history.push(links[tab].url), [
    history,
  ]);

  const activeTab = useMemo(() => {
    const active = links.findIndex((link) => {
      const re = new RegExp(`${link.url.replace(/\//gim, '\\/')}`);
      return location.pathname.match(re);
    });

    return active >= 0 ? active : 0;
  }, [location]);

  useEffect(() => {
    if (!appbar.current || !wrapper.current) return;

    const height = appbar.current.getBoundingClientRect().height;

    if (!height) return;

    wrapper.current.style.height = `${height}px`;
  }, [appbar.current, wrapper.current]);

  return (
    <div ref={wrapper}>
      <AppBar className={classes.appbar} ref={appbar}>
        <Toolbar className={classes.toolbar}>
          <div className={classnames('logo', classes.title)}>
            {config.logo && (
              <Link to="/">
                <img
                  src={config.logo}
                  title={config.title}
                  className={classes.logo}
                  alt={config.title}
                />
              </Link>
            )}
          </div>

          <Tabs
            onChange={onTabChange}
            value={activeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            className={classes.tabs}
          >
            {links.map(({ name, url }) => (
              <Tab label={name} key={url} className={classes.tab} />
            ))}
          </Tabs>

          <div className={classes.account}>{!!config.auth && <Account />}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const HorizontalNavigation = withStyles(styles, { withTheme: true })(
  HorizontalNavigationUnstyled
);

export { HorizontalNavigation };
