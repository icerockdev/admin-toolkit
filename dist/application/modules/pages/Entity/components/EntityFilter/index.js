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
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { Button, IconButton, ListItemText, Menu, MenuItem, withStyles, } from '@material-ui/core';
import styles from './styles';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import FilterIcon from '@material-ui/icons/FilterList';
import { EntityField } from '../EntityField';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
var EntityFilter = withStyles(styles)(observer(function (_a) {
    var classes = _a.classes, fields = _a.fields, filters = _a.filters, filterData = _a.filterData, setFilters = _a.setFilters, applyFilter = _a.applyFilter, withToken = _a.withToken, entity = _a.entity;
    var t = useTranslation().t;
    var _b = useState(null), buttonRef = _b[0], setButtonRef = _b[1];
    var onSelectField = useCallback(function (value) {
        setFilters(__spreadArrays(filters, [{ name: String(value), value: '' }]));
        setButtonRef(null);
    }, [setButtonRef, setFilters, filters]);
    var setFilterValue = useCallback(function (i) { return function (value) {
        setFilters(filters.map(function (filter, index) {
            return i === index ? __assign(__assign({}, filter), { value: value }) : filter;
        }));
    }; }, [filters, setFilters]);
    var removeFilter = useCallback(function (i) { return function () {
        setFilters(filters.filter(function (_, index) { return i !== index; }));
        applyFilter();
    }; }, [applyFilter, filters, setFilters]);
    var filterableFields = useMemo(function () { return fields.filter(function (field) { return field.filterable; }); }, [fields]);
    var selectableFields = useMemo(function () {
        return filterableFields.filter(function (field) { return !filters.some(function (filter) { return filter.name === field.name; }); });
    }, [filterableFields, filters]);
    var currentFilters = useMemo(function () {
        return filters
            .map(function (filter) {
            return filterableFields.find(function (field) { return field.name === filter.name; });
        })
            .filter(function (field) { return !!field; }) || [];
    }, [filterableFields, filters]);
    var onCancel = useCallback(function (event) {
        event.preventDefault();
        setFilters([]);
        applyFilter();
    }, [applyFilter, setFilters]);
    var onSubmit = useCallback(function (event) {
        event.preventDefault();
        applyFilter();
    }, [applyFilter]);
    var onMenuOpen = useCallback(function (event) { return setButtonRef(event.target); }, [
        setButtonRef,
    ]);
    var onMenuClose = useCallback(function (event) { return setButtonRef(null); }, [
        setButtonRef,
    ]);
    return (React.createElement("form", { className: classes.wrapper, onSubmit: onSubmit },
        selectableFields.length > 0 && (React.createElement(React.Fragment, null,
            React.createElement(Button, { "aria-controls": "customized-menu", "aria-haspopup": "true", variant: "outlined", color: "primary", onClick: onMenuOpen, className: classes.filterButton },
                React.createElement(FilterIcon, null)),
            buttonRef && (React.createElement(Menu, { id: "customized-menu", elevation: 0, getContentAnchorEl: null, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, anchorEl: buttonRef, onClose: onMenuClose, open: !!buttonRef }, selectableFields.map(function (field) { return (React.createElement(MenuItem, { key: field.name, onClick: function () { return onSelectField(field.name); } },
                React.createElement(ListItemText, { primary: field.label ? t("fields:" + field.label) : field.name }))); }))))),
        currentFilters.length > 0 && (React.createElement(Fragment, null,
            React.createElement(Button, { onClick: applyFilter, tabIndex: 0, color: "primary", variant: "outlined", className: classes.filterButton },
                React.createElement(CheckIcon, null)))),
        currentFilters.length > 0 && (React.createElement(Fragment, null,
            React.createElement(Button, { onClick: onCancel, tabIndex: 0, color: "secondary", variant: "outlined", className: classes.filterButton },
                React.createElement(ClearIcon, null)))),
        currentFilters.map(function (field, i) {
            var _a;
            return field && (React.createElement("div", { className: classes.input, key: field.name },
                React.createElement(EntityField, { name: field.name, fields: fields, data: __assign(__assign({}, filterData), (_a = {}, _a[field.name] = filters[i].value, _a)), handler: setFilterValue(i), withToken: withToken, entity: entity, isEditing: true, isFiltering: true }),
                React.createElement(IconButton, { color: "secondary", onClick: removeFilter(i), className: classes.clear, tabIndex: 0 },
                    React.createElement(ClearIcon, null))));
        })));
}));
export { EntityFilter };
