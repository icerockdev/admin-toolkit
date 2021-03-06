/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
declare type IProps = WithStyles<typeof styles> & {
    itemsPerPage: number[];
    items: number;
    totalCount: number;
    page: number;
    setPage: (count: number) => void;
    setPerPage: (count: number) => void;
};
declare const EntityFooter: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "page" | "children" | "totalCount" | "itemsPerPage" | "items" | "setPage" | "setPerPage"> & import("@material-ui/core").StyledComponentProps<"pager">>;
export { EntityFooter };
