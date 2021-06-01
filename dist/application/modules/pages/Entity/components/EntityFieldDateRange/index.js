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
import { DateRangePicker } from '@material-ui/pickers';
import parseISO from 'date-fns/parseISO';
import { TextField } from '@material-ui/core';
import { isValid } from 'date-fns';
var EntityFieldDateRange = function (_a) {
    var value = _a.value, handler = _a.handler, label = _a.label, isFiltering = _a.isFiltering;
    var onChange = useCallback(function (value) {
        if (!value || !handler)
            return;
        var filtered = value.map(function (val) { return (val && val.valueOf() && val.toISOString()) || ''; });
        handler(filtered.join(','));
    }, [handler]);
    var parsed = useMemo(function () {
        if (!value)
            return [null, null];
        var split = value && value.split(',');
        if (!split || split.length !== 2)
            return [null, null];
        return split.map(function (date) { return (isValid(new Date(date)) && parseISO(date)) || null; });
    }, [value]);
    if (!isFiltering)
        return null;
    return (React.createElement("div", { className: "datepicker datepicker_range" },
        React.createElement(DateRangePicker, { mask: "__.__.____", renderInput: function (startProps, endProps) { return (React.createElement(React.Fragment, null,
                React.createElement(TextField, __assign({}, startProps, { variant: "outlined", helperText: label, label: "" })),
                React.createElement(TextField, __assign({}, endProps, { variant: "outlined", helperText: "", label: "" })))); }, value: parsed, onChange: onChange })));
};
export { EntityFieldDateRange };
