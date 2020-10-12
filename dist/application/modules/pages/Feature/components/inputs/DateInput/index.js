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
import { observer } from 'mobx-react';
import { TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { formatRFC3339, isDate, parseISO } from 'date-fns';
import { Placeholder } from '../../common/Placeholder';
import styles from './styles.module.scss';
import classNames from 'classnames';
var DateInput = observer(function (_a) {
    var _b = _a.isLoading, isLoading = _b === void 0 ? false : _b, value = _a.value, label = _a.label, error = _a.error, onChange = _a.onChange;
    var parsedValue = useMemo(function () {
        if (isDate(value))
            return value;
        var parsed = value && parseISO(value);
        if (!isDate(parsed))
            return null;
        return parsed;
    }, [value]);
    var handler = useCallback(function (val) {
        if (!val || !handler || !isDate(val))
            return;
        onChange(formatRFC3339(val));
    }, [onChange]);
    return (React.createElement(Placeholder, { isLoading: isLoading, width: "100%", height: "48px" },
        React.createElement(DatePicker, { mask: "__.__.____", renderInput: function (props) { return (React.createElement(TextField, __assign({ size: "small", variant: "filled" }, props, { label: label, error: !!error, helperText: error, placeholder: "", fullWidth: true, className: classNames(styles.input, 'feature-read__input feature-read__input_date') }))); }, value: parsedValue, onChange: handler })));
});
export { DateInput };
