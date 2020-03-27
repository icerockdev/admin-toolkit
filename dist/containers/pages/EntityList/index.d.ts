/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { WithStyles } from '@material-ui/core';
import { IEntityField } from '../../../application';
import styles from './styles';
declare type IProps = WithStyles<typeof styles> & {
    isLoading: boolean;
    fields: IEntityField[];
    data: Record<string, string>[];
    url: string;
    sortBy: string;
    sortDir: 'asc' | 'desc';
    canView: boolean;
    canEdit: boolean;
    onSortChange: (field: string) => void;
};
declare const EntityList: React.ComponentType<Pick<IProps, "data" | "isLoading" | "url" | "onSortChange" | "fields" | "sortBy" | "sortDir" | "canView" | "canEdit"> & import("@material-ui/core").StyledComponentProps<"loader">>;
export { EntityList };
