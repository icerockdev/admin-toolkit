/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityProps } from '../../../application';
declare type IProps = WithStyles<typeof styles> & {
    title: string;
    canCreate: boolean;
    url: string;
    filters: IEntityProps['filters'];
    fields: IEntityProps['fields'];
    setFilters: (filters: IEntityProps['filters']) => void;
    applyFilter: () => void;
};
declare const EntityHead: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "title" | "children" | "url" | "fields" | "applyFilter" | "filters" | "canCreate" | "setFilters"> & import("@material-ui/core").StyledComponentProps<"title" | "header">>;
export { EntityHead };
