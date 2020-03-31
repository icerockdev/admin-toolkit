import React, { MouseEventHandler } from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
declare type IProps = WithStyles<typeof styles> & {
    label: string;
    value: any;
    error?: string;
    isEditing?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    handler?: (val: any) => void;
    availableVariants?: Record<any, any>;
} & Record<string, any>;
declare const EntityFieldBase64Image: React.ComponentType<Pick<IProps, string> & import("@material-ui/core").StyledComponentProps<"label" | "image" | "formControl" | "outlinedInput">>;
export { EntityFieldBase64Image };
