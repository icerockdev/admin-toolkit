import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
declare type IProps = WithStyles<typeof styles> & {
    email?: string;
    username?: string;
    role?: string;
    onLogout?: () => void;
};
declare const Account: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "children" | "email" | "role" | "username" | "onLogout"> & import("@material-ui/core").StyledComponentProps<"account" | "accountCircle">>;
export { Account };
