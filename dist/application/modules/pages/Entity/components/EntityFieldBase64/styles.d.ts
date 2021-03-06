/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';
declare const _default: (theme: Theme) => {
    formControl: {
        margin: string;
        minWidth: number;
        '& input': {
            top: number;
            left: number;
            width: string;
            height: string;
            opacity: number;
        };
    };
    outlinedInput: {
        minHeight: string;
        alignItems: string;
    };
    label: {
        display: string;
        '& > img': {
            marginRight: string;
        };
    };
    image: {
        flex: string;
        width: number;
        height: number;
        backgroundSize: string;
        backgroundPosition: string;
        backgroundColor: string;
    };
    preview: {
        maxWidth: string;
        maxHeight: number;
    };
};
export default _default;
