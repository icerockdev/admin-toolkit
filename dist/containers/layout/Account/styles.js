/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { createStyles } from "@material-ui/core";
export default (function (theme) { return createStyles({
    account: {
        paddingLeft: theme.spacing(3),
        borderLeft: "1px solid #e1e8ee",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "40px"
    },
    accountCircle: {
        width: "42px",
        height: "42px",
        backgroundColor: "#f0f0f3",
        borderRadius: "50%",
        color: "#a5b0bf",
        fontSize: "24px",
        fontWeight: 400,
        textTransform: "uppercase",
        lineHeight: "42px"
    },
}); });
