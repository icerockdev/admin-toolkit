/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityProps, IFilterValue } from '../../../application/types/entity';
import { Entity } from '../../../application';
declare type IProps = WithStyles<typeof styles> & {
    fields: IEntityProps['fields'];
    filters: IFilterValue[];
    filterData: Record<string, any>;
    entity: Entity;
    clearFilter: () => void;
    applyFilter: () => void;
    setFilters: (filters: IFilterValue[]) => void;
    withToken?: (req: any, args: any) => void;
};
declare const Filter: React.ComponentType<Pick<IProps, "withToken" | "entity" | "fields" | "filters" | "filterData" | "setFilters" | "applyFilter" | "clearFilter"> & import("@material-ui/core").StyledComponentProps<"input" | "label" | "select" | "clear" | "formControl" | "wrapper" | "iconButton" | "filterButton">>;
export { Filter };
