/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import { observer } from 'mobx-react';
var EntityFieldReferenceSelect = observer(function (_a) {
    var _b;
    var label = _a.label, name = _a.name, value = _a.value, handler = _a.handler, error = _a.error, isEditing = _a.isEditing, onClick = _a.onClick, entity = _a.entity;
    var emptyNode = (React.createElement("div", null, "\u00A0"));
    if (!entity) {
        return emptyNode;
    }
    var options = (_b = entity.referenceData[name]) !== null && _b !== void 0 ? _b : {};
    // noinspection TypeScriptValidateTypes
    var ref = useRef(null);
    var onChange = useCallback(function (event) {
        if (!handler)
            return;
        handler(event.target.value);
    }, [handler]);
    var _c = useState(0), labelWidth = _c[0], setLabelWidth = _c[1];
    useEffect(function () {
        setLabelWidth((ref.current && ref.current.clientWidth) || 0);
    }, [ref]);
    return isEditing ? (React.createElement(FormControl, { variant: "outlined" },
        React.createElement(InputLabel, { htmlFor: name, error: !!error, style: { whiteSpace: 'nowrap' }, ref: ref }, label),
        React.createElement(Select, { variant: "outlined", id: label, name: name, label: label, value: !value ? '' : value, onChange: onChange, error: !!error, inputProps: { className: 'select' }, labelWidth: labelWidth, style: { minWidth: labelWidth + 40 } },
            React.createElement(MenuItem, { value: "" }, "..."),
            options &&
                Object.keys(options).map(function (item) { return (React.createElement(MenuItem, { key: item, value: item }, options[item])); })),
        React.createElement(FormHelperText, { error: !!error }, error))) : (React.createElement("div", { onClick: onClick }, (options && options[value]) || emptyNode));
});
export { EntityFieldReferenceSelect };
