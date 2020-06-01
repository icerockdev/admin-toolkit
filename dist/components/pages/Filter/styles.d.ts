/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';
declare const _default: (theme: Theme) => {
    wrapper: {
        display: string;
        justifyContent: string;
        flexWrap: "wrap";
        flexDirection: "row-reverse";
        paddingLeft: number;
        margin: string;
        '& .MuiInputLabel-outlined': {
            whiteSpace: string;
        };
        '& > *': {
            marginRight: number;
            marginTop: number;
            marginBottom: number;
        };
    };
    formControl: {
        margin: string;
        minWidth: number;
    };
    select: {
        '& > div': {
            padding: string;
        };
    };
    input: {
        display: string;
        boxShadow: string;
        borderRadius: string;
        backgroundColor: string;
        height: number;
        alignItems: string;
        paddingTop: number;
        '& .select': {
            padding: string;
        };
        '& input': {
            padding: string;
        };
        '& label': {
            transform: string;
        };
    };
    clear: {
        height: number;
        width: number;
        padding: number;
    };
    label: {
        transform: string;
    };
    iconButton: {
        height: number;
        width: number;
        padding: number;
    };
    filterButton: {
        padding: number;
        minWidth: number;
        height: number;
        '& span': {
            width: string;
        };
    };
};
export default _default;
