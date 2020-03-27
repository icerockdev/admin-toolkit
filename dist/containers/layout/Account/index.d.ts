/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
declare type IProps = WithStyles<typeof styles> & {
    email?: string;
    role?: string;
    onLogout?: () => void;
};
declare const Account: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "children" | "email" | "role" | "onLogout"> & import("@material-ui/core").StyledComponentProps<"account" | "accountCircle">>;
export { Account };
