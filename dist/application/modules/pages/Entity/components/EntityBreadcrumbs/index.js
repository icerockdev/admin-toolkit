/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useMemo } from 'react';
import { Grid, Breadcrumbs, Link, Typography, Button, withStyles, } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import styles from './styles';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
var EntityBreadcrumbs = withStyles(styles)(observer(function (_a) {
    var name = _a.name, url = _a.url, isEditing = _a.isEditing, isCreating = _a.isCreating, classes = _a.classes, id = _a.id, fields = _a.fields, data = _a.data, buttons = _a.buttons, viewable = _a.viewable, editable = _a.editable;
    var t = useTranslation().t;
    var title = useMemo(function () {
        var field = fields.find(function (f) { return f.title; });
        return data && field && field.name ? data[field.name] : id;
    }, [data, fields, id]);
    return (React.createElement("div", { className: classes.breadcrumbs },
        React.createElement(Grid, { container: true, alignItems: "center" },
            React.createElement(Grid, { style: { flex: 1 } },
                React.createElement(Breadcrumbs, { "aria-label": "breadcrumb" },
                    name && (React.createElement(Link, { color: "inherit", to: url, component: RouterLink }, t(name))),
                    isEditing && !isCreating && !!title && (React.createElement(Link, { color: "inherit", to: viewable ? url + "/" + id : url, component: RouterLink }, title)),
                    !isEditing && !isCreating && (React.createElement(Typography, { color: "textPrimary" },
                        React.createElement(Helmet, null,
                            React.createElement("title", null, title)),
                        title)),
                    !!isEditing && !isCreating && (React.createElement(Typography, { color: "textPrimary" },
                        React.createElement(Helmet, null,
                            React.createElement("title", null, t('Edit') + ": " + (title !== null && title !== void 0 ? title : ''))),
                        t('Edit'))),
                    !isEditing && !!isCreating && (React.createElement(Typography, { color: "textPrimary" },
                        React.createElement(Helmet, null,
                            React.createElement("title", null, t('Create') + ": " + (name !== null && name !== void 0 ? name : ''))),
                        t('Create'))))),
            buttons,
            !isEditing && !isCreating && editable && (React.createElement(Button, { to: url + "/" + id + "/edit", component: RouterLink, variant: "contained", color: "primary", type: "button" }, t('buttons:Edit'))))));
}));
export { EntityBreadcrumbs };
