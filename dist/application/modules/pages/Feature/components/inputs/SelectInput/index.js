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
import React, { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { observer } from 'mobx-react';
import { MenuItem, TextField, } from '@material-ui/core';
import styles from './styles.module.scss';
import { Autocomplete } from '@material-ui/lab';
import { Placeholder } from '../../common/Placeholder';
import { useFeature } from '../../../../../../utils/hooks';
var SelectInput = observer(function (_a) {
    var onChange = _a.onChange, label = _a.label, value = _a.value, error = _a.error, disabled = _a.disabled, variants = _a.variants, autocomplete = _a.autocomplete, isLoadingReference = _a.isLoadingReference, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b;
    var ref = useRef(null);
    var feature = useFeature();
    var _c = useState(0), labelWidth = _c[0], setLabelWidth = _c[1];
    var onChangeHandler = useCallback(function (event) { return onChange(event.target.value); }, [onChange]);
    var options = useMemo(function () {
        return Object.entries(variants).map(function (_a) {
            var value = _a[0], title = _a[1];
            return ({
                title: title,
                value: value,
            });
        });
    }, [variants]);
    var selected = useMemo(function () {
        return options.find(function (option) { return String(option.value) === String(value); }) || '';
    }, [options, value]);
    var onAutocompleteChange = useCallback(function (_, _a) {
        var value = _a.value;
        return onChange(value);
    }, [onChange]);
    useEffect(function () {
        setLabelWidth((ref.current && ref.current.clientWidth) || 0);
    }, [ref.current]);
    return (React.createElement(Placeholder, { isLoading: isLoading || !!isLoadingReference, width: "100%", height: "48px" },
        React.createElement("div", { className: styles.select }, autocomplete ? (React.createElement(Autocomplete, { disableClearable: true, value: selected, getOptionLabel: function (option) {
                return typeof option === 'string' ? option : option.title;
            }, options: options, onChange: onAutocompleteChange, disabled: disabled, renderInput: function (params) { return (React.createElement(TextField, __assign({}, params, { variant: "filled", placeholder: "\u041F\u043E\u0438\u0441\u043A", label: label, disabled: disabled, error: !!error, helperText: error, size: "small", fullWidth: true }))); } })) : (React.createElement(TextField, { variant: "filled", select: true, label: label, value: value || '', onChange: onChangeHandler, style: { minWidth: labelWidth + 40 }, disabled: disabled, helperText: error, error: !!error, size: "small", fullWidth: true }, options &&
            Object.keys(variants).map(function (item) { return (React.createElement(MenuItem, { key: item, value: item }, variants[item])); }))))));
});
export { SelectInput };
