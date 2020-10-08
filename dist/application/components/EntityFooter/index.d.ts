import React from 'react';
import { WithStyles } from '@material-ui/core';
import styles from './styles';
declare type IProps = WithStyles<typeof styles> & {
    itemsPerPage: number[];
    items: number;
    totalCount: number;
    page: number;
    setPage: (count: number) => void;
    setPerPage: (count: number) => void;
};
declare const EntityFooter: React.ComponentType<Pick<React.PropsWithChildren<IProps>, "children" | "page" | "totalCount" | "itemsPerPage" | "items" | "setPage" | "setPerPage"> & import("@material-ui/core").StyledComponentProps<"floater" | "pager">>;
export { EntityFooter };
