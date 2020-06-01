/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';
declare const _default: (theme: Theme) => {
    header: {
        margin: string;
        display: string;
        justifyContent: string;
        padding: string;
        alignItems: "flex-start";
        flexWrap: "nowrap";
        '& .MuiButton-label': {
            fontWeight: string;
            fontSize: string;
            lineHeight: string;
            height: number;
        };
        '& .MuiInputBase-input': {};
        '& .MuiButton-outlinedPrimary': {
            backgroundColor: string;
            border: string;
        };
        '& .MuiOutlinedInput-notchedOutline': {
            border: string;
        };
        '& h4': {
            whiteSpace: string;
        };
        '& > *': {
            margin: string;
        };
    };
    title: {
        color: string;
        fontSize: string;
        fontWeight: number;
        flexGrow: number;
        whiteSpace: "nowrap";
    };
    buttons: {
        marginRight: number;
        flexWrap: "nowrap";
        display: "flex";
    };
    export: {
        marginRight: number;
    };
};
export default _default;
