/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { ReactElement } from '../../../../../../../../../admin-toolkit/_node_modules/@types/react';
import { WithStyles } from '../../../../../../../../../admin-toolkit/_node_modules/@material-ui/core';
import styles from './styles';
import { IEntityField } from '../../../../..';
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
    editable: boolean;
};
declare const EntityBreadcrumbs: React.ComponentType<Pick<IProps, "data" | "id" | "name" | "url" | "fields" | "buttons" | "isEditing" | "viewable" | "isCreating" | "editable"> & import("../../../../../../../../../admin-toolkit/_node_modules/@material-ui/core").StyledComponentProps<"breadcrumbs">>;
export { EntityBreadcrumbs };
