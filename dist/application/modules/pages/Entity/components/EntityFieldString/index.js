/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useMemo } from 'react';
import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
var EntityFieldString = observer(function (_a) {
    var label = _a.label, value = _a.value, handler = _a.handler, error = _a.error, isEditing = _a.isEditing, onClick = _a.onClick, placeholder = _a.placeholder;
    var text = useMemo(function () {
        return (value &&
            value
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/gi, '<a href="$1" target="blank" rel="nofollow">$1</a>')) ||
            '';
    }, [value]);
    var onChange = useCallback(function (event) {
        if (!handler)
            return;
        handler(event.target.value);
    }, [handler]);
    return isEditing ? (React.createElement("div", null,
        React.createElement(TextField, { label: label, value: value || '', onChange: onChange, error: !!error, helperText: error, variant: "outlined", placeholder: placeholder || '' }))) : (React.createElement("div", { onClick: onClick, dangerouslySetInnerHTML: { __html: text ? String(text) : '&nbsp;' } }));
});
export { EntityFieldString };
