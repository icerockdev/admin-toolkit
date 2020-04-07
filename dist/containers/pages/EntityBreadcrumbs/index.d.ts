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
};
declare const EntityBreadcrumbs: React.ComponentType<Pick<IProps, "data" | "id" | "url" | "name" | "isEditing" | "fields" | "buttons" | "isCreating"> & import("@material-ui/core").StyledComponentProps<"breadcrumbs">>;
export { EntityBreadcrumbs };
