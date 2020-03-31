import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityProps } from '../../../application/types/entity';
declare type IProps = WithStyles<typeof styles> & {
    current: string;
    value: any;
    fields: IEntityProps['fields'];
    clearFilter: () => void;
    applyFilter: () => void;
    setFilterCurrent: (current: string) => void;
    setFilterValue: (value: any) => void;
};
declare const Filter: React.ComponentType<Pick<IProps, "value" | "fields" | "current" | "clearFilter" | "setFilterCurrent" | "setFilterValue" | "applyFilter"> & import("@material-ui/core").StyledComponentProps<"input" | "label" | "select" | "formControl" | "wrapper" | "iconButton">>;
export { Filter };
