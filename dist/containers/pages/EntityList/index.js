/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { createElement, useMemo } from 'react';
import { TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Paper, CircularProgress, Button, ButtonGroup, withStyles, } from '@material-ui/core';
import { getEntityFieldRenderer, } from '../../../application';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { EntityHeadSortable } from '../../../components/pages/EntityHeadSortable';
import styles from './styles';
var EntityList = withStyles(styles)(function (_a) {
    var classes = _a.classes, isLoading = _a.isLoading, fields = _a.fields, data = _a.data, url = _a.url, sortBy = _a.sortBy, sortDir = _a.sortDir, withToken = _a.withToken, canView = _a.canView, canEdit = _a.canEdit, onSortChange = _a.onSortChange;
    var visibleFields = useMemo(function () { return fields.filter(function (field) { return !field.hideInList; }); }, [fields]);
    if (isLoading) {
        return (React.createElement("div", { className: classes.loader },
            React.createElement(CircularProgress, null)));
    }
    return (React.createElement(Paper, null,
        React.createElement(TableContainer, null,
            React.createElement(Table, null,
                React.createElement(TableHead, null,
                    React.createElement(TableRow, null,
                        visibleFields.map(function (field) {
                            return field.sortable ? (React.createElement(EntityHeadSortable, { active: sortBy === field.name, direction: sortDir, key: field.name, field: field.name, onSortChange: onSortChange },
                                React.createElement("b", null, field.label || field.name))) : (React.createElement(TableCell, { key: field.name },
                                React.createElement("b", null, field.label || field.name)));
                        }),
                        (canView || canEdit) && React.createElement(TableCell, null))),
                React.createElement(TableBody, null, data.map(function (entry, i) { return (React.createElement(TableRow, { key: i },
                    visibleFields.map(function (field) { return (React.createElement(TableCell, { key: field.name }, createElement(field.type === 'custom' && field.component
                        ? field.component
                        : getEntityFieldRenderer(field.type || typeof entry[field.name]), {
                        label: field.label || field.name,
                        value: entry[field.name],
                        options: field.options || {},
                        data: data,
                        fields: fields,
                        withToken: withToken,
                    }))); }),
                    (canEdit || canView) && (React.createElement(TableCell, { size: "small", align: "right" },
                        React.createElement(ButtonGroup, { variant: "text" },
                            canEdit && (React.createElement(Button, { to: url + "/" + entry.id + "/edit", component: RouterLink },
                                React.createElement(EditIcon, null))),
                            canView && (React.createElement(Button, { to: url + "/" + entry.id + "/", component: RouterLink },
                                React.createElement(VisibilityIcon, null)))))))); }))))));
});
export { EntityList };
