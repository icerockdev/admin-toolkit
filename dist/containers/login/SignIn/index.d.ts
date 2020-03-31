/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

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
declare const SignIn: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "children" | "onSubmit" | "onForgotScreenClick"> & import("@material-ui/core").StyledComponentProps<"header" | "wrap" | "marginTop" | "paper" | "forgot">>;
export { SignIn };
