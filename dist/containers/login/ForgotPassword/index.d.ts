import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { WithStyles } from '@material-ui/core';
import styles from '../styles';
declare type IProps = WithStyles<typeof styles> & {
    email: string;
    onEmailChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onSubmit: FormEventHandler;
};
declare const ForgotPassword: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "children" | "email" | "onSubmit" | "onEmailChange"> & import("@material-ui/core").StyledComponentProps<"header" | "wrap" | "marginTop" | "paper" | "forgot">>;
export { ForgotPassword };
