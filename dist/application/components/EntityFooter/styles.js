/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
export default (function (theme) { return ({
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
