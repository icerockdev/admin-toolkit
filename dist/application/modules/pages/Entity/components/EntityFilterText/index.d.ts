/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
declare type IProps = WithStyles<typeof styles> & {
    label: string;
    value: any;
    onChange: (val: any) => void;
} & Record<string, any>;
declare const EntityFilterText: React.ComponentType<Pick<IProps, string> & import("@material-ui/core").StyledComponentProps<"input">>;
export { EntityFilterText };
