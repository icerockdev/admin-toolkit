/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityFieldProps } from '../../../../..';
declare type IProps = IEntityFieldProps & WithStyles<typeof styles> & {};
declare const EntityFieldBase64Image: React.ComponentType<Pick<IProps, "mask" | "data" | "label" | "name" | "onClick" | "placeholder" | "value" | "error" | "options" | "fields" | "isEditing" | "withToken" | "entity" | "handler" | "isFiltering"> & import("@material-ui/core").StyledComponentProps<"label" | "image" | "formControl" | "outlinedInput" | "preview">>;
export { EntityFieldBase64Image };
