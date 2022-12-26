/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from '../../../../../../../admin-toolkit/_node_modules/@types/react';
import { Config } from '../../..';
import { WithStyles } from '../../../../../../../admin-toolkit/_node_modules/@material-ui/core';
import styles from './styles';
import '../../../styles/main.scss';
declare type IProps = WithStyles<typeof styles> & {
    config: Config;
};
declare const Application: React.ComponentType<Pick<IProps, "config"> & import("../../../../../../../admin-toolkit/_node_modules/@material-ui/core").StyledComponentProps<"wrapper">>;
export { Application };
