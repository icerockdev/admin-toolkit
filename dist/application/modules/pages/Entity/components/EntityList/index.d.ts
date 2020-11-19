/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { MouseEvent, ReactNode } from 'react';
import { WithStyles } from '@material-ui/core';
import { ENTITY_SORT_DIRS, IEntityField } from '../../types';
import styles from './styles';
import { Entity } from '../../../..';
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
    onRowClick?: (id: any, event: MouseEvent<any>) => void;
    firstRow?: ReactNode;
    lastRow?: ReactNode;
    tableHead?: ReactNode;
    before?: ReactNode;
    after?: ReactNode;
};
declare const EntityList: React.ComponentType<Pick<IProps, "after" | "data" | "url" | "selected" | "isLoading" | "fields" | "sortDir" | "sortBy" | "withToken" | "entity" | "onSortChange" | "before" | "extra" | "canView" | "canEdit" | "canSelect" | "setSelected" | "onRowClick" | "firstRow" | "lastRow" | "tableHead"> & import("@material-ui/core").StyledComponentProps<"button" | "table" | "paper" | "loader" | "button_active">>;
export { EntityList };
