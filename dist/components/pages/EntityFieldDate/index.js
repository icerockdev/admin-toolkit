/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { DatePicker } from '@material-ui/pickers';
import format from 'date-fns/format';
var EntityFieldDate = function (_a) {
    var value = _a.value, handler = _a.handler, error = _a.error, isEditing = _a.isEditing, onClick = _a.onClick;
    var onChange = useCallback(function (value) {
        if (!handler)
            return;
        handler(value === null || value === void 0 ? void 0 : value.toISOString());
    }, [value, handler]);
    return isEditing ? (React.createElement("div", null,
        React.createElement(DatePicker, { value: value ? new Date(value) : null, onChange: onChange, format: "dd.MM.yyyy", error: !!error, helperText: error, inputVariant: "outlined" }))) : (React.createElement("div", { onClick: onClick }, format(new Date(value), 'dd.MM.yyyy') || ''));
};
export { EntityFieldDate };
