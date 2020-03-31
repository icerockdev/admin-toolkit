import React from 'react';
import { WithStyles } from '@material-ui/core';
import { IEntityField, ENTITY_SORT_DIRS } from '../../../application';
import styles from './styles';
declare type IProps = WithStyles<typeof styles> & {
    isLoading: boolean;
    fields: IEntityField[];
    data: Record<string, string>[];
    url: string;
    sortBy: string;
    sortDir: typeof ENTITY_SORT_DIRS[keyof typeof ENTITY_SORT_DIRS];
    canView: boolean;
    canEdit: boolean;
    onSortChange: (field: string) => void;
};
declare const EntityList: React.ComponentType<Pick<IProps, "canEdit" | "data" | "isLoading" | "url" | "onSortChange" | "fields" | "sortBy" | "sortDir" | "canView"> & import("@material-ui/core").StyledComponentProps<"loader">>;
export { EntityList };
