/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
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
import React, { useCallback, Fragment, useMemo } from 'react';
import { withStyles, FormControl, InputLabel, Select, MenuItem, IconButton, } from '@material-ui/core';
import styles from './styles';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { EntityField } from '../../../application/components/EntityField';
import { observer } from 'mobx-react';
var Filter = withStyles(styles)(observer(function (_a) {
    var classes = _a.classes, fields = _a.fields, filters = _a.filters, filterData = _a.filterData, setFilters = _a.setFilters, applyFilter = _a.applyFilter, withToken = _a.withToken;
    var onSelectField = useCallback(function (event) {
        if (!event.target.value)
            return;
        setFilters(__spreadArrays(filters, [
            { name: String(event.target.value), value: '' },
        ]));
    }, [setFilters, filters]);
    var setFilterValue = useCallback(function (i) { return function (value) {
        setFilters(filters.map(function (filter, index) {
            return i === index ? __assign(__assign({}, filter), { value: value }) : filter;
        }));
    }; }, [filters, setFilters]);
    var removeFilter = useCallback(function (i) { return function () {
        setFilters(filters.filter(function (_, index) { return i !== index; }));
    }; }, [filters, setFilters]);
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
    var onSubmit = useCallback(function (event) {
        event.preventDefault();
        applyFilter();
    }, [applyFilter]);
    return (React.createElement("form", { className: classes.wrapper, onSubmit: onSubmit },
        selectableFields.length > 0 && (React.createElement(FormControl, { variant: "outlined", className: classes.formControl },
            React.createElement(InputLabel, { htmlFor: "field", className: classes.label }, "\u0424\u0438\u043B\u044C\u0442\u0440"),
            React.createElement(Select, { variant: "outlined", id: "field", name: "field", label: "\u0424\u0438\u043B\u044C\u0442\u0440", value: "", onChange: onSelectField, className: classes.select },
                React.createElement(MenuItem, { value: "" }, "..."),
                selectableFields.map(function (field) { return (React.createElement(MenuItem, { key: field.name, value: field.name }, field.label || field.name)); })))),
        currentFilters.map(function (field, i) {
            var _a;
            return field && (React.createElement("div", { className: classes.input, key: field.name },
                React.createElement(EntityField, { name: field.name, fields: fields, data: __assign(__assign({}, filterData), (_a = {}, _a[field.name] = filters[i].value, _a)), handler: setFilterValue(i), withToken: withToken, isEditing: true }),
                React.createElement(IconButton, { color: "secondary", onClick: removeFilter(i), className: classes.clear, tabIndex: 0 },
                    React.createElement(ClearIcon, null))));
        }),
        currentFilters.length > 0 && (React.createElement(Fragment, null,
            React.createElement(IconButton, { color: "primary", onClick: applyFilter, className: classes.iconButton, tabIndex: 0 },
                React.createElement(CheckIcon, null))))));
}));
export { Filter };
