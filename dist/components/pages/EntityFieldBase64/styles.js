export default (function (theme) { return ({
    formControl: {
        margin: theme.spacing(2) + "px 0 " + theme.spacing(1) + "px",
        minWidth: 120,
        '& input': {
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
        },
    },
    outlinedInput: {
        minHeight: '56px',
        alignItems: 'inherit',
    },
    label: {
        display: 'flex',
        '& > img': {
            marginRight: '10px',
        },
    },
    image: {
        flex: '0 0 56px',
        width: 56,
        height: 56,
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        backgroundColor: '#eeeeee',
    },
}); });
