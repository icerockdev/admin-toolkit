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
import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, CircularProgress, Grid, Paper, withStyles, } from '@material-ui/core';
import styles from './styles';
import { EntityField } from '../../../../..';
import { observer } from 'mobx-react';
import { useTranslation } from "react-i18next";
var EntityViewer = withStyles(styles)(observer(function (_a) {
    var classes = _a.classes, id = _a.id, fields = _a.fields, errors = _a.errors, onSave = _a.onSave, onCancel = _a.onCancel, onResetFieldError = _a.onResetFieldError, isLoading = _a.isLoading, data = _a.data, setEditorData = _a.setEditorData, getItem = _a.getItem, cancelGetItem = _a.cancelGetItem, withToken = _a.withToken, isEditing = _a.isEditing, entity = _a.entity;
    var t = useTranslation().t;
    var isCreating = useMemo(function () { return typeof id === 'undefined'; }, [id]);
    var visibleFields = useMemo(function () {
        return fields.filter(function (field) {
            return (isEditing && !isCreating && !field.hideInEdit) ||
                (isCreating && !field.hideInCreate) ||
                (!isEditing && !isCreating && !field.hideInView);
        });
    }, [fields, isEditing, isCreating]);
    var onFieldChange = useCallback(function (f) { return function (value) {
        var _a;
        if (errors[f]) {
            onResetFieldError(f);
        }
        setEditorData(__assign(__assign({}, data), (_a = {}, _a[f] = value, _a)));
    }; }, [errors, setEditorData, data, onResetFieldError]);
    var onSubmit = useCallback(function (event) {
        event.preventDefault();
        onSave();
    }, [onSave]);
    useEffect(function () {
        getItem(id);
        return function () { return cancelGetItem(); };
    }, [cancelGetItem, getItem, id]);
    if (isLoading) {
        return (React.createElement("div", { className: classes.loader },
            React.createElement(CircularProgress, null)));
    }
    return (React.createElement("div", { className: classes.wrap }, data && (React.createElement("form", { onSubmit: onSubmit },
        React.createElement(Paper, null,
            React.createElement("div", { className: classes.grid, style: { flexWrap: 'wrap' } },
                visibleFields.map(function (field) { return (React.createElement("div", { className: classes.field, key: field.name },
                    !isEditing && (React.createElement("div", { className: "label" },
                        field.label ? t("fields:" + field.label) : field.name,
                        isEditing && field.required && React.createElement("span", null, " *"))),
                    React.createElement("div", { className: "field" },
                        React.createElement(EntityField, { name: field.name, data: data, fields: fields, isEditing: isEditing, error: errors[field.name], handler: onFieldChange(field.name), withToken: withToken, entity: entity })))); }),
                isEditing && (React.createElement("div", { className: classes.field + " " + classes.buttons },
                    React.createElement(Grid, { container: true, spacing: 1 },
                        React.createElement(Grid, { item: true, style: { flex: 1 } }),
                        React.createElement(Grid, { item: true },
                            React.createElement(Button, { type: "button", color: "default", variant: "outlined", onClick: onCancel }, t('buttons:Cancel'))),
                        React.createElement(Grid, { item: true },
                            React.createElement(Button, { type: "submit", variant: "contained", color: "primary" }, t('buttons:Save'))))))))))));
}));
export { EntityViewer };
