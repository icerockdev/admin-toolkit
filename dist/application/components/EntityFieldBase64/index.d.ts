import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityFieldProps } from '../..';
declare type IProps = IEntityFieldProps & WithStyles<typeof styles> & {};
declare const EntityFieldBase64Image: React.ComponentType<Pick<IProps, "data" | "label" | "mask" | "error" | "withToken" | "placeholder" | "onClick" | "name" | "value" | "handler" | "isEditing" | "options" | "entity" | "fields" | "isFiltering"> & import("@material-ui/core").StyledComponentProps<"label" | "image" | "formControl" | "outlinedInput" | "preview">>;
export { EntityFieldBase64Image };
