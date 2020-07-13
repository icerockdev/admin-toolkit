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
import React, { useCallback, useMemo } from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { TextField } from '@material-ui/core';
import { formatISO, isValid } from 'date-fns';
var EntityFieldDateTime = function (_a) {
    var value = _a.value, handler = _a.handler, label = _a.label, error = _a.error, isEditing = _a.isEditing, onClick = _a.onClick;
    var onChange = useCallback(function (value) {
        if (!value || !handler || !isValid(value))
            return;
        handler(value.toISOString());
    }, [value, handler]);
    var parsedValue = useMemo(function () {
        var date = parseISO(value);
        return (date && isValid(date) && formatISO(date)) || "";
    }, [value]);
    return isEditing ? (React.createElement("div", { className: "datepicker datepicker_datetime" },
        React.createElement(DateTimePicker, { renderInput: function (props) { return (React.createElement(TextField, __assign({ variant: "outlined" }, props, { label: label, helperText: "" }))); }, value: parsedValue, onChange: onChange, ampm: false }))) : (React.createElement("div", { onClick: onClick }, value && parseISO(value) ? (format(parseISO(value), 'dd.MM.yyyy HH:mm')) : (React.createElement("div", null, "\u00A0"))));
};
export { EntityFieldDateTime };
