/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { ReactElement } from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityProps } from '../../../application';
declare type IProps = WithStyles<typeof styles> & {
    title: ReactElement;
    buttons: ReactElement;
    canCreate: boolean;
    canExport: boolean;
    url: string;
    filters: IEntityProps['filters'];
    fields: IEntityProps['fields'];
    filterData: Record<string, any>;
    setFilters: (filters: IEntityProps['filters']) => void;
    applyFilter: () => void;
    onExport: () => void;
    withToken?: (req: any, args: any) => void;
};
declare const EntityHead: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "title" | "children" | "withToken" | "url" | "fields" | "filters" | "filterData" | "setFilters" | "applyFilter" | "buttons" | "canCreate" | "canExport" | "onExport"> & import("@material-ui/core").StyledComponentProps<"title" | "header" | "buttons" | "export">>;
export { EntityHead };
