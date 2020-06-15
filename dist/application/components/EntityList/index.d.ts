/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { ReactNode } from 'react';
import { WithStyles } from '@material-ui/core';
import { IEntityField, ENTITY_SORT_DIRS } from '../..';
import styles from './styles';
import { Entity } from '../../modules';
declare type IProps = WithStyles<typeof styles> & {
    isLoading: boolean;
    fields: IEntityField[];
    data: Record<string, string>[];
    url: string;
    sortBy: string;
    sortDir: typeof ENTITY_SORT_DIRS[keyof typeof ENTITY_SORT_DIRS];
    selected: any[];
    entity: Entity;
    extra: (({ id, onClose, }: {
        id: any;
        onClose: (id: any) => void;
    }) => JSX.Element) | null;
    canView: boolean;
    canEdit: boolean;
    canSelect?: boolean;
    setSelected: (items: any[]) => void;
    onSortChange: (field: string) => void;
    withToken?: (req: any, args: any) => void;
    onRowClick?: (id: any) => void;
    firstRow?: ReactNode;
    lastRow?: ReactNode;
    tableHead?: ReactNode;
    before?: ReactNode;
    after?: ReactNode;
};
declare const EntityList: React.ComponentType<Pick<IProps, "data" | "isLoading" | "withToken" | "url" | "after" | "selected" | "fields" | "entity" | "onSortChange" | "extra" | "sortBy" | "sortDir" | "canView" | "canEdit" | "canSelect" | "setSelected" | "onRowClick" | "before" | "firstRow" | "lastRow" | "tableHead"> & import("@material-ui/core").StyledComponentProps<"button" | "table" | "loader" | "button_active">>;
export { EntityList };
