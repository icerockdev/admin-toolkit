/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import styles from './styles';
import { WithStyles } from '@material-ui/core';
declare type IProps = WithStyles<typeof styles> & {
    logo?: {
        url?: string;
        title?: string;
    };
    account?: {
        email?: string;
        username?: string;
        role?: string;
    };
    links: {
        name: string;
        url: string;
    }[];
    onLogout?: () => void;
};
declare const Navigation: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "children" | "logo" | "links" | "account" | "onLogout"> & import("@material-ui/core").StyledComponentProps<"title" | "link" | "logo" | "toolbar" | "appbar" | "links" | "tabs">>;
export { Navigation };
