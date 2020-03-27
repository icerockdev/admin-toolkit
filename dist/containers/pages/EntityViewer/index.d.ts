import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityField } from '../../../application';
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
