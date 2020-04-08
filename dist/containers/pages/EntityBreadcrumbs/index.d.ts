/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { ReactElement } from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityField } from '../../../application';
declare type IProps = WithStyles<typeof styles> & {
    id?: string;
    name: string;
    url: string;
    isEditing?: boolean;
    isCreating?: boolean;
    fields: IEntityField[];
    data: Record<string, any>;
    buttons?: ReactElement;
    viewable: boolean;
};
declare const EntityBreadcrumbs: React.ComponentType<Pick<IProps, "data" | "id" | "url" | "name" | "isEditing" | "fields" | "buttons" | "viewable" | "isCreating"> & import("@material-ui/core").StyledComponentProps<"breadcrumbs">>;
export { EntityBreadcrumbs };
