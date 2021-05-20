/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
import { useConfig } from '~/application/utils/hooks';
import { Link } from 'react-router-dom';
import { FormHelperText } from "@material-ui/core";
import {
  ADMIN_USER_EMAIL,
  ADMIN_USER_PASSWORD,
  COMMON_USER_EMAIL,
  COMMON_USER_PASSWORD
} from "~/example/auth/__mocks__/authData";

interface IProps {}

const AuthCustomLayout: FC<IProps> = observer(({ children }) => {
  const config = useConfig();
  const splash = config.auth?.splash || '';

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <div className={styles.left__wrap}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={config.logo} alt={config.title} />
            </Link>
          </div>

          <div className={styles.form}>
            <div className={styles.content}>
              {children}
            </div>
          </div>
          <div>
            <h4>Demo login details</h4>
            <FormHelperText>Admin user: {ADMIN_USER_EMAIL} / {ADMIN_USER_PASSWORD}</FormHelperText>
            <FormHelperText>Common user: {COMMON_USER_EMAIL} / {COMMON_USER_PASSWORD}</FormHelperText>
          </div>
        </div>
      </div>

      <div
        className={styles.image}
        style={{ backgroundImage: `url('${splash}')` }}
      />
    </div>
  );
});

export { AuthCustomLayout };
