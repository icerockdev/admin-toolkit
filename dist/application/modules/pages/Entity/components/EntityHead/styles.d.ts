/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '../../../../../../../../../admin-toolkit/_node_modules/@material-ui/core';
declare const _default: (theme: Theme) => {
    header: {
        display: string;
        padding: string;
        justifyContent: string;
        alignItems: "flex-start";
        flexWrap: "nowrap";
        minHeight: string;
        '@media(max-width: 640px)': {
            flexDirection: "column";
        };
        '& .MuiButton-label': {
            fontWeight: string;
            fontSize: string;
            lineHeight: string;
            height: number;
        };
        '& .MuiInputBase-input': {};
        '& .MuiButton-outlinedPrimary, & .MuiButton-outlinedSecondary': {
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
        '@media(max-width: 640px)': {
            width: string;
            alignItems: string;
            justifyContent: string;
            paddingRight: number;
        };
    };
    export: {
        marginRight: number;
    };
};
export default _default;
