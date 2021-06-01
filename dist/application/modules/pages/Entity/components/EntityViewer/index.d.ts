/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityField } from '../../../../..';
import { Entity } from '../../../..';
declare type IProps = WithStyles<typeof styles> & {
    url: string;
    id?: string;
    fields: IEntityField[];
    errors: Record<string, string>;
    isEditing: boolean;
    isLoading: boolean;
    data: Record<string, any>;
    viewable: boolean;
    entity: Entity;
    setEditorData: (data: Record<string, any>) => void;
    getItem: (id: any) => void;
    cancelGetItem: () => void;
    onSave: () => void;
    onCancel: () => void;
    onResetFieldError: (field: string) => void;
    withToken?: (req: any, args: any) => any;
};
declare const EntityViewer: React.ComponentType<Pick<IProps, "data" | "id" | "url" | "isLoading" | "fields" | "errors" | "isEditing" | "withToken" | "onSave" | "onCancel" | "onResetFieldError" | "setEditorData" | "getItem" | "cancelGetItem" | "entity" | "viewable"> & import("@material-ui/core").StyledComponentProps<"grid" | "wrap" | "buttons" | "field" | "loader">>;
export { EntityViewer };
