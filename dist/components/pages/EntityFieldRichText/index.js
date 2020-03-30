/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback } from 'react';
import MUIRichTextEditor from 'mui-rte';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
var EntityFieldRichText = function (_a) {
    var label = _a.label, value = _a.value, handler = _a.handler, error = _a.error, isEditing = _a.isEditing, onClick = _a.onClick;
    var onChange = useCallback(function (data) {
        var text = draftToHtml(convertToRaw(data.getCurrentContent()));
        console.log({ text: text });
    }, [value, handler]);
    return isEditing ? (React.createElement("div", null,
        React.createElement(MUIRichTextEditor, { label: label, value: value || '', onChange: onChange, error: !!error }))) : (React.createElement("div", { onClick: onClick }, String(value)));
};
export { EntityFieldRichText };
