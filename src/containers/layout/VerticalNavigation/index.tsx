/* Copyright (c) 2020-2022 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { useConfig } from '~/application/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { List, Collapse, ListItem } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

interface IProps {}

const VerticalNavigation: FC<IProps> = observer(() => {
  const [openList, setOpenList] = useState(false);
  const config = useConfig();
  const { t } = useTranslation();
  const navigation = config.linksForCurrentUser.filter((item) => item.enabled);

  const handleClick = () => {
    setOpenList(!openList);
  };

  return (
    <div className={classNames(styles.navigation, 'vertical-navigation')}>
      {navigation.map((link) => {
        if (link.childFields) {
          return (
            <List
              component="nav"
              disablePadding={true}
              subheader={
                <ListItem onClick={handleClick} className={styles.list}>
                  <h2 className={styles.text}>{link.name}</h2>
                  {openList ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              }
            >
              <Collapse in={openList}>
                {link.childFields.map((child) => {
                  return (
                    <ListItem className={styles.list}>
                      <NavLink
                        to={child.url}
                        className={classNames(
                          styles.link,
                          'vertical-navigation__link'
                        )}
                        key={child.url}
                      >
                        {t(child.label)}
                      </NavLink>
                    </ListItem>
                  );
                })}
              </Collapse>
            </List>
          );
        }
        return (
          <NavLink
            to={link.url}
            className={classNames(styles.link, 'vertical-navigation__link')}
            key={link.url}
          >
            {t(link.name)}
          </NavLink>
        );
      })}
    </div>
  );
});

export { VerticalNavigation };
