import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from '../styles';
declare type IProps = WithStyles<typeof styles> & {
    onSubmit?: (props: {
        token: string;
        password: string;
        passwordRepeat: string;
    }) => void;
    token: string;
};
declare const ResetPassword: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "children" | "token" | "onSubmit"> & import("@material-ui/core").StyledComponentProps<"header" | "wrap" | "marginTop" | "paper" | "forgot">>;
export { ResetPassword };
