/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityProps, IFilterValue } from '../../types';
import { Entity } from '../../../../..';
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
declare const EntityFilter: React.ComponentType<Pick<IProps, "fields" | "filters" | "withToken" | "entity" | "filterData" | "setFilters" | "applyFilter" | "clearFilter"> & import("@material-ui/core").StyledComponentProps<"wrapper" | "clear" | "input" | "label" | "select" | "formControl" | "iconButton" | "filterButton">>;
export { EntityFilter };
