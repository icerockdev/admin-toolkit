/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { Checkbox } from '@material-ui/core';
var EntityFieldBoolean = function (_a) {
    var value = _a.value, handler = _a.handler, isEditing = _a.isEditing, onClick = _a.onClick;
    var onChange = useCallback(function () {
        if (!handler)
            return;
        handler(!value);
    }, [value, handler]);
    return isEditing ? (React.createElement("div", null,
        React.createElement(Checkbox, { onChange: onChange, checked: value || false }))) : (React.createElement("div", { onClick: onClick }, !!value ? React.createElement(CheckIcon, null) : React.createElement(ClearIcon, null)));
};
export { EntityFieldBoolean };
