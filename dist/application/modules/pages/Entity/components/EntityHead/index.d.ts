/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { ReactElement } from '../../../../../../../../../admin-toolkit/_node_modules/@types/react';
import { WithStyles } from '../../../../../../../../../admin-toolkit/_node_modules/@material-ui/core';
import styles from './styles';
import { IEntityProps } from '../../../../..';
import { Entity } from '../../../..';
declare type IProps = WithStyles<typeof styles> & {
    title: ReactElement;
    buttons: ReactElement;
    canCreate: boolean;
    canExport: boolean;
    url: string;
    filters: IEntityProps['filters'];
    fields: IEntityProps['fields'];
    filterData: Record<string, any>;
    entity: Entity;
    setFilters: (filters: IEntityProps['filters']) => void;
    applyFilter: () => void;
    onExport: () => void;
    withToken?: (req: any, args: any) => void;
};
declare const EntityHead: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "title" | "children" | "url" | "fields" | "buttons" | "filters" | "withToken" | "entity" | "filterData" | "setFilters" | "applyFilter" | "canCreate" | "canExport" | "onExport"> & import("../../../../../../../../../admin-toolkit/_node_modules/@material-ui/core").StyledComponentProps<"header" | "title" | "buttons" | "export">>;
export { EntityHead };
