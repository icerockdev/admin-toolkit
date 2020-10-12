import React from 'react';
import { Config } from '../../..';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import '../../../styles/main.scss';
declare type IProps = WithStyles<typeof styles> & {
    config: Config;
};
declare const Application: React.ComponentType<Pick<IProps, "config"> & import("@material-ui/core").StyledComponentProps<"wrapper">>;
export { Application };
