/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
export default (function (theme) { return ({
    wrapper: {
        height: '36px',
        display: 'flex',
    },
    formControl: {
        margin: "0 " + theme.spacing(1) + "px 0 0",
        minWidth: 120,
    },
    select: {
        '& > div': {
            padding: '10px 14px 7px',
        },
    },
    input: {
        display: 'flex',
        boxShadow: 'inset rgba(0, 0, 0, 1) 0 0 1px',
        borderRadius: '0 4px 4px 0',
        marginRight: 5,
        '& .select': {
            padding: '10px 34px 7px 14px',
        },
        '& input': {
            padding: '10px 14px 7px',
        },
        '& label': {
            transform: 'translate(10px, 12px) scale(0.9)',
        },
    },
    clear: {
        height: 36,
        width: 36,
        padding: 0,
    },
    label: {
        transform: 'translate(10px, 12px) scale(0.9)',
    },
    iconButton: {
        height: 36,
        width: 36,
        padding: 0,
    },
}); });
