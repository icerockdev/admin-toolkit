/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';
declare const _default: (theme: Theme) => {
    floater: {
        width: string;
        bottom: number;
        left: number;
        backgroundColor: string;
        boxShadow: string;
        zIndex: number;
        '& .MuiTablePagination-root': {
            padding: number;
            margin: number;
            paddingTop: string;
        };
    };
    pager: {
        margin: string;
        paddingTop: string;
        borderTop: string;
        '& .MuiIconButton-root': {
            backgroundColor: string;
            borderRadius: string;
            width: number;
            height: number;
            padding: number;
            color: string;
            '&:hover': {
                backgroundColor: string;
            };
            '&:last-child': {
                marginLeft: number;
            };
            '&.Mui-disabled': {
                backgroundColor: string;
            };
        };
    };
};
export default _default;
