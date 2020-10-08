import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from '../styles';
declare type IProps = WithStyles<typeof styles> & {
    onSubmit?: ({ email }: {
        email: string;
    }) => void;
};
declare const ForgotPassword: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "children" | "onSubmit"> & import("@material-ui/core").StyledComponentProps<"header" | "wrap" | "marginTop" | "paper" | "forgot">>;
export { ForgotPassword };
