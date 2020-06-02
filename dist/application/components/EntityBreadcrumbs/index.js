/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useMemo } from 'react';
import { Grid, Breadcrumbs, Link, Typography, Button, withStyles, } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import styles from './styles';
import { observer } from 'mobx-react';
var EntityBreadcrumbs = withStyles(styles)(observer(function (_a) {
    var name = _a.name, url = _a.url, isEditing = _a.isEditing, isCreating = _a.isCreating, classes = _a.classes, id = _a.id, fields = _a.fields, data = _a.data, buttons = _a.buttons, viewable = _a.viewable;
    var title = useMemo(function () {
        var field = fields.find(function (f) { return f.title; });
        return data && field && field.name ? data[field.name] : id;
    }, [data, fields, id]);
    return (React.createElement("div", { className: classes.breadcrumbs },
        React.createElement(Grid, { container: true, alignItems: "center" },
            React.createElement(Grid, { style: { flex: 1 } },
                React.createElement(Breadcrumbs, { "aria-label": "breadcrumb" },
                    name && (React.createElement(Link, { color: "inherit", to: url, component: RouterLink }, name)),
                    isEditing && !isCreating && !!title && (React.createElement(Link, { color: "inherit", to: viewable ? url + "/" + id : url, component: RouterLink }, title)),
                    !isEditing && !isCreating && (React.createElement(Typography, { color: "textPrimary" }, title)),
                    !!isEditing && !isCreating && (React.createElement(Typography, { color: "textPrimary" }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435")),
                    !!isEditing && isCreating && (React.createElement(Typography, { color: "textPrimary" }, "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435")))),
            buttons,
            !isEditing && !isCreating && (React.createElement(Button, { to: url + "/" + id + "/edit", component: RouterLink, variant: "contained", color: "primary", type: "button" }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C")))));
}));
export { EntityBreadcrumbs };
