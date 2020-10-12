/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import { TextField, withStyles } from '@material-ui/core';
import styles from './styles';
var EntityFilterText = withStyles(styles)(function (_a) {
    var classes = _a.classes, label = _a.label, value = _a.value, onChange = _a.onChange;
    var onInput = useCallback(function (event) { return onChange(event.target.value); }, [
        onChange,
    ]);
    return (React.createElement(TextField, { onChange: onInput, value: value, name: "field", label: label, variant: "outlined", className: classes.input, autoFocus: true }));
});
export { EntityFilterText };
