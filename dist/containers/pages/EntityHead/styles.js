/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
export default (function (theme) { return ({
    header: {
        margin: '5px 0',
        display: 'flex',
        justifyContent: 'center',
        '& > *': {
            margin: '5px 0',
        },
    },
    title: {
        color: '#282f36',
        fontSize: '34px',
        fontWeight: 900,
        flexGrow: 1,
    },
    buttons: {
        marginRight: theme.spacing(1),
    },
    export: {
        marginRight: theme.spacing(1),
    },
}); });
