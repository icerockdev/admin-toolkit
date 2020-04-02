/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

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
    withToken?: (req: any, args: any) => any;
};
declare const EntityList: React.ComponentType<Pick<IProps, "data" | "isLoading" | "withToken" | "url" | "onSortChange" | "fields" | "sortBy" | "sortDir" | "canView" | "canEdit"> & import("@material-ui/core").StyledComponentProps<"loader">>;
export { EntityList };
