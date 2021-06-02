/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
var EntityFieldTextarea = observer(function (_a) {
    var label = _a.label, value = _a.value, handler = _a.handler, error = _a.error, isEditing = _a.isEditing, onClick = _a.onClick, placeholder = _a.placeholder;
    var onChange = useCallback(function (event) {
        if (!handler)
            return;
        handler(event.target.value);
    }, [value, handler]);
    return isEditing ? (React.createElement("div", null,
        React.createElement(TextField, { multiline: true, label: label, value: value || '', onChange: onChange, error: !!error, helperText: error, variant: "outlined", placeholder: placeholder || '' }))) : (React.createElement("pre", { onClick: onClick, className: styles.pre }, value ? value.replace(/(<([^>]+)>)/gi, '') : ''));
});
export { EntityFieldTextarea };
