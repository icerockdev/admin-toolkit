/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityField } from '../../../types/entity';
declare type IProps = WithStyles<typeof styles> & {
    url: string;
    entityName: string;
    entities: Record<string, any>[];
    id?: string;
    fields: IEntityField[];
    isEditing: boolean;
    onSave: (data: Record<string, any>) => void;
};
declare const EntityViewer: React.ComponentType<Pick<IProps, "id" | "url" | "isEditing" | "fields" | "entities" | "entityName" | "onSave"> & import("@material-ui/core").StyledComponentProps<"wrap" | "field" | "breadcrumbs">>;
export { EntityViewer };
