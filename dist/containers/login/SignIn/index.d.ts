import React, { MouseEventHandler } from 'react';
import { WithStyles } from '@material-ui/core';
import styles from '../styles';
declare type IProps = WithStyles<typeof styles> & {
    onForgotScreenClick: MouseEventHandler;
    onSubmit: ({ email, password }: {
        email: string;
        password: string;
    }) => void;
};
declare const SignIn: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "children" | "onForgotScreenClick" | "onSubmit"> & import("@material-ui/core").StyledComponentProps<"header" | "wrap" | "marginTop" | "paper" | "forgot">>;
export { SignIn };
