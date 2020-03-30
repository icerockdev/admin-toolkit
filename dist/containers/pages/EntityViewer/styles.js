/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
export default (function (theme) { return ({
    wrap: {
        marginBottom: theme.spacing(4),
    },
    field: {
        color: '#282f36',
        fontSize: '17px',
        fontWeight: 400,
        fontFamily: theme.typography.fontFamily,
        padding: theme.spacing(4) + "px " + theme.spacing(3) + "px",
        borderBottom: '1px solid #e1e8ee',
        '& > .label': {
            display: 'block',
            color: '#a5b0bf',
            fontSize: '14px',
        },
        '& > .field': {
            marginTop: theme.spacing(1),
            display: 'block',
        },
    },
    breadcrumbs: {
        marginBottom: theme.spacing(2),
        height: 36,
        alignItems: 'center',
        display: 'flex',
    },
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
    },
}); });
