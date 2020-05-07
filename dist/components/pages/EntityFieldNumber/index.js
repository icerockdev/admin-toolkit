/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { TextField } from '@material-ui/core';
var EntityFieldNumber = function (_a) {
    var label = _a.label, value = _a.value, handler = _a.handler, error = _a.error, isEditing = _a.isEditing, onClick = _a.onClick, options = _a.options;
    var onChange = useCallback(function (event) {
        if (!handler)
            return;
        handler(event.target.value);
    }, [value, handler]);
    var val = (value &&
        parseFloat(value) &&
        parseFloat(parseFloat(value).toFixed((options === null || options === void 0 ? void 0 : options.accuracy) || 6))) ||
        0;
    return isEditing ? (React.createElement("div", null,
        React.createElement(TextField, { type: "number", label: label, value: value || '', onChange: onChange, error: !!error, helperText: error, variant: "outlined" }))) : (React.createElement("div", { onClick: onClick }, val || 0));
};
export { EntityFieldNumber };
