/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var _a;
import React, { useCallback, Fragment, useMemo, createElement, } from 'react';
import { withStyles, FormControl, InputLabel, Select, MenuItem, IconButton, } from '@material-ui/core';
import styles from './styles';
import { ENTITY_FILTER_TYPES, getEntityFieldRenderer, } from '../../../application/types/entity';
import { FilterText } from '../FilterText';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
var FILTER_RENDERERS = (_a = {},
    _a[ENTITY_FILTER_TYPES.TEXT] = FilterText,
    _a);
var Filter = withStyles(styles)(function (_a) {
    var classes = _a.classes, current = _a.current, value = _a.value, fields = _a.fields, clearFilter = _a.clearFilter, setFilterCurrent = _a.setFilterCurrent, setFilterValue = _a.setFilterValue, applyFilter = _a.applyFilter;
    var onChangeField = useCallback(function (event) {
        setFilterCurrent(String(event.target.value));
    }, [setFilterCurrent]);
    var onResetFilter = useCallback(function () {
        clearFilter();
    }, [clearFilter]);
    var field = useMemo(function () { return (current && fields.find(function (field) { return field.name === current; })) || null; }, [fields, current]);
    var filterableFields = useMemo(function () { return fields.filter(function (field) { return field.filterable; }); }, [fields]);
    var onSubmit = useCallback(function (event) {
        event.preventDefault();
        applyFilter();
    }, [applyFilter]);
    if (!filterableFields.length) {
        return null;
    }
    return (React.createElement("form", { className: classes.wrapper, onSubmit: onSubmit },
        React.createElement(FormControl, { variant: "outlined", className: classes.formControl },
            React.createElement(InputLabel, { htmlFor: "field", className: classes.label }, "\u0424\u0438\u043B\u044C\u0442\u0440"),
            React.createElement(Select, { variant: "outlined", id: "field", name: "field", label: "\u0424\u0438\u043B\u044C\u0442\u0440", value: current, onChange: onChangeField, className: classes.select },
                React.createElement(MenuItem, { value: "" }, "..."),
                filterableFields.map(function (field) { return (React.createElement(MenuItem, { key: field.name, value: field.name }, field.label || field.name)); }))),
        field && (React.createElement(Fragment, null,
            React.createElement("div", { className: classes.input }, createElement(getEntityFieldRenderer(field.type), {
                value: value,
                label: field.label || field.name,
                isEditing: true,
                handler: setFilterValue,
                options: field.options || {},
            })),
            React.createElement(IconButton, { color: "secondary", onClick: onResetFilter, className: classes.iconButton, tabIndex: 0 },
                React.createElement(ClearIcon, null)),
            React.createElement(IconButton, { disabled: !value, color: "primary", onClick: applyFilter, className: classes.iconButton, tabIndex: 0 },
                React.createElement(CheckIcon, null))))));
});
export { Filter };
