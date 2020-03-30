/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityField } from '../../../application';
declare type IProps = WithStyles<typeof styles> & {
    url: string;
    entityName: string;
    id?: string;
    fields: IEntityField[];
    errors: Record<string, string>;
    isEditing: boolean;
    isLoading: boolean;
    data: Record<string, any>;
    setEditorData: (data: Record<string, any>) => void;
    getItem: (id: any) => void;
    cancelGetItem: () => void;
    onSave: () => void;
    onResetFieldError: (field: string) => void;
};
declare const EntityViewer: React.ComponentType<Pick<IProps, "data" | "isLoading" | "id" | "url" | "isEditing" | "onSave" | "fields" | "errors" | "entityName" | "onResetFieldError" | "setEditorData" | "getItem" | "cancelGetItem"> & import("@material-ui/core").StyledComponentProps<"wrap" | "field" | "loader" | "breadcrumbs">>;
export { EntityViewer };
