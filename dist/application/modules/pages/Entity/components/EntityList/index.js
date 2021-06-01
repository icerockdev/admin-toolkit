/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { createElement, Fragment, useCallback, useMemo, useState, } from 'react';
import { Button, Checkbox, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles, } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { EntityHeadSortable } from '../EntityHeadSortable';
import styles from './styles';
import { EntityField } from '../../../../..';
import { observer } from 'mobx-react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import omit from 'ramda/es/omit';
import classnames from 'classnames';
var EntityList = observer(withStyles(styles)(function (_a) {
    var classes = _a.classes, isLoading = _a.isLoading, fields = _a.fields, entity = _a.entity, data = _a.data, url = _a.url, extra = _a.extra, selected = _a.selected, sortBy = _a.sortBy, sortDir = _a.sortDir, canView = _a.canView, canEdit = _a.canEdit, canSelect = _a.canSelect, onSortChange = _a.onSortChange, setSelected = _a.setSelected, withToken = _a.withToken, onRowClick = _a.onRowClick, _b = _a.before, before = _b === void 0 ? null : _b, _c = _a.after, after = _c === void 0 ? null : _c, _d = _a.firstRow, firstRow = _d === void 0 ? null : _d, _e = _a.lastRow, lastRow = _e === void 0 ? null : _e, _f = _a.tableHead, tableHead = _f === void 0 ? null : _f;
    var _g = useState({}), expanded = _g[0], setExpanded = _g[1];
    var visibleFields = useMemo(function () { return fields.filter(function (field) { return !field.hideInList; }); }, [fields]);
    var history = useHistory();
    var onRowClicked = useCallback(function (id, event) {
        var _a;
        if (onRowClick) {
            return onRowClick(id, event);
        }
        if (extra) {
            return setExpanded(__assign(__assign({}, expanded), (_a = {}, _a[id] = !expanded[id], _a)));
        }
        if (canView) {
            return history.push(url + "/" + id);
        }
        if (canEdit) {
            return history.push(url + "/" + id + "/edit");
        }
    }, [
        canView,
        canEdit,
        history,
        url,
        extra,
        expanded,
        setExpanded,
        onRowClick,
    ]);
    var onSelect = useCallback(function (id, includes) {
        setSelected(!includes ? selected.filter(function (el) { return el !== id; }) : __spreadArrays(selected, [id]));
    }, [selected, setSelected]);
    var isAllSelected = useMemo(function () { return selected.length === data.length; }, [
        data,
        selected,
    ]);
    var onSelectAll = useCallback(function () {
        setSelected(isAllSelected ? [] : data.map(function (el) { return el.id; }));
    }, [selected, setSelected, isAllSelected, data]);
    var colSpan = useMemo(function () {
        return visibleFields.length +
            (canView ? 1 : 0) +
            (canEdit ? 1 : 0) +
            (canSelect ? 1 : 0) +
            (extra ? 1 : 0);
    }, [visibleFields, canEdit, canView, canSelect]);
    var onExtraClose = useCallback(function (id) { return setExpanded(omit([id], expanded)); }, [setExpanded, expanded]);
    if (isLoading) {
        return (React.createElement("div", { className: classes.loader },
            React.createElement(CircularProgress, null)));
    }
    return (React.createElement(React.Fragment, null,
        before,
        React.createElement(TableContainer, null,
            React.createElement(Table, { className: classes.table, stickyHeader: true, size: "medium" },
                tableHead || (React.createElement(TableHead, null,
                    React.createElement(TableRow, null,
                        extra && React.createElement(TableCell, null),
                        canSelect && (React.createElement(TableCell, null,
                            React.createElement(Checkbox, { onChange: onSelectAll, checked: isAllSelected }))),
                        visibleFields.map(function (field) {
                            return field.sortable ? (React.createElement(EntityHeadSortable, { active: sortBy === field.name, direction: sortDir, key: field.name, field: field.name, onSortChange: onSortChange },
                                React.createElement("b", null, field.label || field.name))) : (React.createElement(TableCell, { key: field.name },
                                React.createElement("b", null, field.label || field.name)));
                        }),
                        canView && React.createElement(TableCell, null),
                        canEdit && React.createElement(TableCell, null)))),
                React.createElement(TableBody, null,
                    firstRow,
                    data.map(function (entry, i) { return (React.createElement(Fragment, { key: i },
                        React.createElement(TableRow, { hover: true },
                            extra && (React.createElement(TableCell, { onClick: function (event) { return onRowClicked(entry.id, event); } }, expanded[entry.id] ? (React.createElement(KeyboardArrowDownIcon, null)) : (React.createElement(KeyboardArrowRightIcon, null)))),
                            canSelect && (React.createElement(TableCell, null,
                                React.createElement(Checkbox, { checked: selected.includes(entry.id), onChange: function (_, includes) {
                                        return onSelect(entry.id, includes);
                                    } }))),
                            visibleFields.map(function (field) { return (React.createElement(TableCell, { key: field.name, onClick: function (event) { return onRowClicked(entry.id, event); } },
                                React.createElement(EntityField, { name: field.name, fields: fields, data: entry, withToken: withToken, entity: entity }))); }),
                            canEdit && (React.createElement(TableCell, { size: "small", align: "right", className: classes.button },
                                React.createElement(Button, { to: url + "/" + entry.id + "/edit", component: RouterLink },
                                    React.createElement(EditIcon, null)))),
                            canView && (React.createElement(TableCell, { size: "small", align: "right", className: classnames(classes.button, classes.button_active) },
                                React.createElement(Button, { to: url + "/" + entry.id + "/", component: RouterLink },
                                    React.createElement(LaunchIcon, null))))),
                        !!extra && expanded[entry.id] && (React.createElement(TableRow, null,
                            React.createElement(TableCell, { colSpan: colSpan }, createElement(extra, {
                                id: entry.id,
                                onClose: onExtraClose,
                            })))))); }),
                    lastRow))),
        after));
}));
export { EntityList };
