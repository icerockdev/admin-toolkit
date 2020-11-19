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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import styles from './styles.module.scss';
import { FilterWrapper } from '../../components/filters/FilterWrapper';
import { DatePicker, DateRangePicker } from '@material-ui/pickers';
import { formatRFC3339, isDate, isValid, parseISO } from 'date-fns';
var DateFilter = function (_a) {
    var label = _a.label, name = _a.name, initialValue = _a.value, isRange = _a.isRange, onChange = _a.onChange, onReset = _a.onReset, inline = _a.inline;
    var _b = useState(initialValue), value = _b[0], setValue = _b[1];
    var onRangeChange = useCallback(function (_a) {
        var start = _a[0], end = _a[1];
        if (!start || !end || !isValid(start) || !isValid(end))
            return;
        var val = [start, end].map(function (it) { return formatRFC3339(it); }).join(',');
        onChange(val);
    }, [onChange]);
    var onSingleChange = useCallback(function (val) {
        if (!val || !isValid(val))
            return;
        onChange(formatRFC3339(val));
    }, [onChange]);
    var rangeValue = useMemo(function () {
        if (!value || !isRange || typeof value !== 'string')
            return [null, null];
        var _a = value.split(',').map(function (it) { return parseISO(it); }), start = _a[0], end = _a[1];
        if (!isDate(start) || !isDate(end))
            return [null, null];
        return [start, end];
    }, [value, isRange]);
    var singleValue = useMemo(function () {
        if (isDate(value))
            return value;
        var parsed = value && parseISO(value);
        if (!isDate(parsed))
            return null;
        return parsed;
    }, [value]);
    useEffect(function () {
        if (initialValue !== value) {
            setValue(initialValue);
        }
    }, [initialValue]);
    return (React.createElement(FilterWrapper, { onClear: onReset, inline: inline },
        React.createElement("div", { className: styles.datepicker },
            React.createElement(FormControl, { className: styles.control },
                isRange && (React.createElement(DateRangePicker, { mask: "dd.MM.yyyy", label: label, renderInput: function (startProps, endProps) { return (React.createElement(React.Fragment, null,
                        React.createElement(TextField, __assign({}, startProps, { label: label, helperText: "", variant: "filled", size: "small" })),
                        React.createElement(TextField, __assign({}, endProps, { variant: "filled", size: "small", helperText: "", label: "", placeholder: "" })))); }, value: rangeValue, onChange: onRangeChange })),
                !isRange && (React.createElement(DatePicker, { mask: "__.__.____", renderInput: function (props) { return (React.createElement(TextField, __assign({ variant: "outlined" }, props, { label: label, helperText: "", placeholder: "" }))); }, value: singleValue, onChange: onSingleChange }))))));
};
export { DateFilter };
