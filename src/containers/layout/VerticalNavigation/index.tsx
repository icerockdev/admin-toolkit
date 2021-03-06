/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useConfig } from '~/application/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";

interface IProps {}

const VerticalNavigation: FC<IProps> = observer(() => {
  const config = useConfig();
  const {t} = useTranslation();
  const navigation = config.linksForCurrentUser.filter(item => item.enabled)

  return (
    <div className={classNames(styles.navigation, 'vertical-navigation')}>
      {navigation.map((link) => (
        <NavLink
          to={link.url}
          className={classNames(styles.link, 'vertical-navigation__link')}
          key={link.url}
        >
          {t(link.name)}
        </NavLink>
      ))}
    </div>
  );
});

export { VerticalNavigation };
