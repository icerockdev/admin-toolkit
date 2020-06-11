/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { createStyles } from '@material-ui/core';
export default (function (theme) {
    return createStyles({
        appbar: {
            backgroundColor: '#fff',
            height: '78px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        toolbar: {
            height: '78px',
            '& .MuiTabs-scrollButtons svg': {
                fill: theme.palette.primary.main,
            },
            '@media(max-width: 640px)': {
                '& .logo': {
                    display: 'none',
                },
            },
        },
        title: {
            // marginLeft: theme.spacing(2),
            flexGrow: 1,
        },
        links: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
        },
        logo: {
            maxHeight: 54,
        },
        tab: {
            height: '100%',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '14px',
        },
        tabs: {
            height: '100%',
            '& a': {
                minWidth: 0,
            },
            '& .MuiTabs-flexContainer': {
                height: '100%',
            },
            '& .MuiTab-root': {
                minWidth: 'auto',
                padding: '2px 16px',
            },
        },
        link: {
            color: '#a5b0bf',
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '0 16px',
            position: 'relative',
            whiteSpace: 'nowrap',
            '&.active': {
                color: '#282f36',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    height: '2px',
                    width: '100%',
                    backgroundColor: theme.palette.primary.main,
                    left: 0,
                    bottom: '-30px',
                },
            },
        },
    });
});
