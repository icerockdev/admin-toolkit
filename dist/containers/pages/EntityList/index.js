/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { createElement } from 'react';
import { TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Paper, CircularProgress, Button, ButtonGroup, } from '@material-ui/core';
import { getEntityFieldRenderer } from '../../../application';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { EntityHeadSortable } from '../../../components/pages/EntityHeadSortable';
var EntityList = function (_a) {
    var isLoading = _a.isLoading, fields = _a.fields, data = _a.data, url = _a.url, sortBy = _a.sortBy, sortDir = _a.sortDir, canView = _a.canView, canEdit = _a.canEdit, onSortChange = _a.onSortChange;
    return (React.createElement(Paper, null,
        React.createElement(TableContainer, null,
            React.createElement(Table, null,
                React.createElement(TableHead, null,
                    React.createElement(TableRow, null,
                        fields.map(function (field) {
                            return field.sortable ? (React.createElement(EntityHeadSortable, { active: sortBy === field.name, direction: sortDir, key: field.name, field: field.name, onSortChange: onSortChange },
                                React.createElement("span", null, field.label || field.name))) : (React.createElement(TableCell, { key: field.name }, field.label || field.name));
                        }),
                        (canView || canEdit) && React.createElement(TableCell, null))),
                isLoading ? (React.createElement(TableBody, null,
                    React.createElement(TableRow, null,
                        React.createElement(TableCell, { colSpan: fields.length, align: "center" },
                            React.createElement(CircularProgress, null))))) : (React.createElement(TableBody, null, data.map(function (entry, i) { return (React.createElement(TableRow, { key: i },
                    fields.map(function (field) { return (React.createElement(TableCell, { key: field.name }, createElement(getEntityFieldRenderer(field.type || typeof entry[field.name]), {
                        value: entry[field.name],
                    }))); }),
                    (canEdit || canView) && (React.createElement(TableCell, { size: "small", align: "right" },
                        React.createElement(ButtonGroup, { variant: "text" },
                            canEdit && (React.createElement(Button, { to: url + "/" + entry.id + "/edit", component: RouterLink },
                                React.createElement(EditIcon, null))),
                            canView && (React.createElement(Button, { to: url + "/" + entry.id + "/", component: RouterLink },
                                React.createElement(VisibilityIcon, null)))))))); })))))));
};
export { EntityList };
