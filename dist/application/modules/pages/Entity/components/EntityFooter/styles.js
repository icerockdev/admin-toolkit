/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
export default (function (theme) { return ({
    floater: {
        width: '100%',
        bottom: 0,
        left: 0,
        backgroundColor: '#fefefe',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0 -3px 3px',
        zIndex: 1,
        '& .MuiTablePagination-root': {
            padding: 10,
            margin: 0,
            paddingTop: '10px !important',
        },
    },
    pager: {
        margin: '30px 20px 20px 20px',
        paddingTop: '20px !important',
        borderTop: '1px solid #dddddd',
        '& .MuiIconButton-root': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '4px',
            width: 40,
            height: 40,
            padding: 0,
            color: 'white',
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
            '&:last-child': {
                marginLeft: 10,
            },
            '&.Mui-disabled': {
                backgroundColor: '#dddddd',
            },
        },
    },
}); });
