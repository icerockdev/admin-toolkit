/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

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
    options?: Record<any, any>;
} & Record<string, any>;
declare const EntityFieldBase64Image: React.ComponentType<Pick<IProps, string> & import("@material-ui/core").StyledComponentProps<"label" | "image" | "formControl" | "outlinedInput" | "preview">>;
export { EntityFieldBase64Image };
