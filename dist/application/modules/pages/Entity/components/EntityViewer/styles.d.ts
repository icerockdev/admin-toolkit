/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '../../../../../../../../../admin-toolkit/_node_modules/@material-ui/core';
declare const _default: (theme: Theme) => {
    grid: {
        display: string;
        gridTemplateColumns: string;
    };
    wrap: {
        marginBottom: number;
        margin: number;
        '& .MuiFormControl-root': {
            width: string;
        };
    };
    field: {
        color: string;
        fontSize: string;
        fontWeight: number;
        fontFamily: string | undefined;
        padding: string;
        boxShadow: string;
        '& > .label': {
            display: string;
            color: string;
            fontSize: string;
        };
        '& > .field': {
            marginTop: number;
            display: string;
        };
    };
    loader: {
        display: string;
        alignItems: string;
        justifyContent: string;
        minHeight: number;
    };
    buttons: {
        gridColumnStart: number;
        gridColumnEnd: number;
    };
};
export default _default;
