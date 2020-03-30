/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { TextField } from '@material-ui/core';
var EntityFieldString = function (_a) {
    var label = _a.label, value = _a.value, handler = _a.handler, error = _a.error, isEditing = _a.isEditing, onClick = _a.onClick;
    var onChange = useCallback(function (event) {
        if (!handler)
            return;
        handler(event.target.value);
    }, [value, handler]);
    return isEditing ? (React.createElement("div", null,
        React.createElement(TextField, { label: label, value: value || '', onChange: onChange, error: !!error, helperText: error, variant: "outlined" }))) : (React.createElement("div", { onClick: onClick }, String(value)));
};
export { EntityFieldString };
