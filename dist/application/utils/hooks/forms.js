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
/**
 * useErrorsWithClearOnInput - required fields validation hook
 *
 * @return [errors, setErrors, fieldValidator]
 *
 * @param fields - dictionary of (required) fields
 * @param fieldError - custom field error
 * @param validationError - custom throwed error
 */
import { useCallback, useState, useEffect, } from 'react';
import { has, isEmpty, omit } from 'ramda';
export var useErrorsWithClearOnInput = function (fields, fieldError, validationError) {
    var _a = useState({}), errors = _a[0], setErrors = _a[1];
    Object.entries(fields).forEach(function (_a) {
        var key = _a[0], val = _a[1];
        return useEffect(function () {
            if (has(key, errors))
                setErrors(omit([key], errors));
        }, [val]);
    });
    var fieldValidator = useCallback(function () {
        var faulty = Object.entries(fields).reduce(function (acc, _a) {
            var _b;
            var key = _a[0], val = _a[1];
            return (isEmpty(val) ? __assign(__assign({}, acc), (_b = {}, _b[key] = fieldError, _b)) : acc);
        }, {});
        setErrors(faulty);
        if (Object.values(faulty).length) {
            throw new Error(validationError || 'This field is required');
        }
    }, [fields]);
    return [errors, setErrors, fieldValidator];
};
