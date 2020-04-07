/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityProps, IFilterValue } from '../../../application/types/entity';
declare type IProps = WithStyles<typeof styles> & {
    fields: IEntityProps['fields'];
    filters: IFilterValue[];
    clearFilter: () => void;
    applyFilter: () => void;
    setFilters: (filters: IFilterValue[]) => void;
};
declare const Filter: React.ComponentType<Pick<IProps, "fields" | "filters" | "setFilters" | "clearFilter" | "applyFilter"> & import("@material-ui/core").StyledComponentProps<"input" | "label" | "select" | "clear" | "formControl" | "wrapper" | "iconButton">>;
export { Filter };
