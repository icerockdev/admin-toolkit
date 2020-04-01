/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
var EntityFieldSelect = function (_a) {
    var label = _a.label, value = _a.value, handler = _a.handler, error = _a.error, isEditing = _a.isEditing, onClick = _a.onClick, availableVariants = _a.availableVariants;
    var onChange = useCallback(function (event) {
        if (!handler)
            return;
        handler(event.target.value);
    }, [value, handler]);
    return isEditing ? (React.createElement(FormControl, { variant: "outlined" },
        React.createElement(InputLabel, { htmlFor: label }, label),
        React.createElement(Select, { variant: "outlined", id: label, name: label, label: label, value: !value ? '' : value, onChange: onChange, error: !!error, inputProps: { className: 'select' } },
            React.createElement(MenuItem, { value: "" }, "..."),
            availableVariants &&
                Object.keys(availableVariants).map(function (item) { return (React.createElement(MenuItem, { key: item, value: item }, availableVariants[item])); })))) : (React.createElement("div", { onClick: onClick }, availableVariants && availableVariants[value]));
};
export { EntityFieldSelect };