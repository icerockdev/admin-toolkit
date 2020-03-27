import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
declare type IProps = WithStyles<typeof styles> & {
    current: string;
    value: any;
    fields: {
        name: string;
        label?: string;
        type: string;
        variants?: {
            label: string | number;
            value: string;
        }[];
    }[];
    clearFilter: () => void;
    applyFilter: () => void;
    setFilterCurrent: (current: string) => void;
    setFilterValue: (value: any) => void;
};
declare const Filter: React.ComponentType<Pick<IProps, "value" | "fields" | "current" | "clearFilter" | "setFilterCurrent" | "setFilterValue" | "applyFilter"> & import("@material-ui/core").StyledComponentProps<"input" | "label" | "select" | "formControl" | "wrapper" | "iconButton">>;
export { Filter };
