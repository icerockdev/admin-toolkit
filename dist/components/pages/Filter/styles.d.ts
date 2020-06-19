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
        '@media(max-width: 640px)': {
            width: string;
        };
        '& .MuiInputLabel-outlined': {
            whiteSpace: string;
        };
        '& > *': {
            marginRight: number;
            marginTop: number;
            marginBottom: number;
        };
        '& .datepicker .MuiFormHelperText-contained ': {
            position: string;
            top: number;
            left: number;
            whiteSpace: string;
        };
        '& .datepicker_range input': {
            width: number;
        };
        '& .datepicker_range .MuiPickersDateRangePickerInput-rangeInputsContainer': {
            flexDirection: string;
        };
        '& .datepicker_datetime input': {
            width: number;
        };
        '& .datepicker_date input': {
            width: number;
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
        minHeight: number;
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
