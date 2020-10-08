import { Theme } from '@material-ui/core';
declare const _default: (theme: Theme) => {
    loader: {
        display: string;
        alignItems: string;
        justifyContent: string;
        minHeight: number;
    };
    table: {
        '& td, & th': {
            padding: string;
            fontSize: string;
            lineHeight: string;
        };
        '& tr': {
            height: string;
        };
        '& svg': {
            verticalAlign: string;
        };
    };
    button: {
        boxSizing: "border-box";
        borderLeft: string;
        padding: string;
        width: number;
        '& a': {
            color: string;
            minWidth: string;
        };
    };
    button_active: {
        '& a': {
            background: string;
            color: string;
            borderRadius: string;
            padding: string;
            '&:hover': {
                backgroundColor: string;
            };
        };
    };
};
export default _default;
