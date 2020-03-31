import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { IEntityProps } from '../../../application';
declare type IProps = WithStyles<typeof styles> & {
    title: string;
    canCreate: boolean;
    url: string;
    filters: IEntityProps['filters'];
    fields: IEntityProps['fields'];
    setFilters: (filters: IEntityProps['filters']) => void;
    applyFilter: () => void;
};
declare const EntityHead: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "title" | "canCreate" | "children" | "url" | "fields" | "applyFilter" | "filters" | "setFilters"> & import("@material-ui/core").StyledComponentProps<"title" | "header">>;
export { EntityHead };
