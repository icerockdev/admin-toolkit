/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useMemo, useCallback } from 'react';
import { TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Paper, CircularProgress, Button, ButtonGroup, withStyles, } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { EntityHeadSortable } from '../../../components/pages/EntityHeadSortable';
import styles from './styles';
import { EntityField } from '../../../application/components/EntityField';
import { useHistory } from 'react-router-dom';
var EntityList = withStyles(styles)(function (_a) {
    var classes = _a.classes, isLoading = _a.isLoading, fields = _a.fields, data = _a.data, url = _a.url, sortBy = _a.sortBy, sortDir = _a.sortDir, canView = _a.canView, canEdit = _a.canEdit, onSortChange = _a.onSortChange;
    var visibleFields = useMemo(function () { return fields.filter(function (field) { return !field.hideInList; }); }, [fields]);
    var history = useHistory();
    var onRowClick = useCallback(function (id) {
        if (canView) {
            return history.push(url + "/" + id);
        }
        if (canEdit) {
            return history.push(url + "/" + id + "/edit");
        }
    }, [canView, canEdit, history, url]);
    if (isLoading) {
        return (React.createElement("div", { className: classes.loader },
            React.createElement(CircularProgress, null)));
    }
    return (React.createElement(Paper, null,
        React.createElement(TableContainer, null,
            React.createElement(Table, { className: classes.table },
                React.createElement(TableHead, null,
                    React.createElement(TableRow, null,
                        visibleFields.map(function (field) {
                            return field.sortable ? (React.createElement(EntityHeadSortable, { active: sortBy === field.name, direction: sortDir, key: field.name, field: field.name, onSortChange: onSortChange },
                                React.createElement("b", null, field.label || field.name))) : (React.createElement(TableCell, { key: field.name },
                                React.createElement("b", null, field.label || field.name)));
                        }),
                        (canView || canEdit) && React.createElement(TableCell, null))),
                React.createElement(TableBody, null, data.map(function (entry, i) { return (React.createElement(TableRow, { key: i, hover: true },
                    visibleFields.map(function (field) { return (React.createElement(TableCell, { key: field.name, onClick: function () { return onRowClick(entry.id); } },
                        React.createElement(EntityField, { name: field.name, fields: fields, data: entry }))); }),
                    (canEdit || canView) && (React.createElement(TableCell, { size: "small", align: "right" },
                        React.createElement(ButtonGroup, { variant: "text" },
                            canEdit && (React.createElement(Button, { to: url + "/" + entry.id + "/edit", component: RouterLink },
                                React.createElement(EditIcon, null))),
                            canView && (React.createElement(Button, { to: url + "/" + entry.id + "/", component: RouterLink },
                                React.createElement(VisibilityIcon, null)))))))); }))))));
});
export { EntityList };
