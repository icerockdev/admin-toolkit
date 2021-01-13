/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
export default (function (theme) { return ({
    header: {
        display: 'flex',
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        minHeight: '80px',
        '@media(max-width: 640px)': {
            flexDirection: 'column',
        },
        '& .MuiButton-label': {
            fontWeight: 'bold',
            fontSize: '14px',
            lineHeight: '16px',
            height: 38,
        },
        '& .MuiInputBase-input': {},
        '& .MuiButton-outlinedPrimary, & .MuiButton-outlinedSecondary': {
            backgroundColor: 'white',
            border: '1px solid #EBEBEB !important',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& h4': {
            whiteSpace: 'nowrap',
        },
        '& > *': {
            margin: '5px 0',
        },
    },
    title: {
        color: '#282f36',
        fontSize: '34px',
        fontWeight: 900,
        flexGrow: 1,
        whiteSpace: 'nowrap',
    },
    buttons: {
        marginRight: theme.spacing(1),
        flexWrap: 'nowrap',
        display: 'flex',
        '@media(max-width: 640px)': {
            width: '100%',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingRight: 10,
        },
    },
    export: {
        marginRight: theme.spacing(1),
    },
}); });
