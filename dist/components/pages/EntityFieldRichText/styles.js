export default (function (theme) { return ({
    formControl: {
        margin: theme.spacing(2) + "px 0 " + theme.spacing(1) + "px",
        minWidth: 120,
        '& #description-editor': {
            padding: "0 " + theme.spacing(2) + "px",
            borderTop: '1px solid #c4c4c4',
            width: '100%',
        },
        '& #description-container > div:nth-child(2)': {
            padding: theme.spacing(2) + "px",
            borderTop: '1px solid #c4c4c4',
            minHeight: '250px',
        },
        '& #description-root': {
            width: '100%',
            minHeight: '300px',
        },
    },
}); });
