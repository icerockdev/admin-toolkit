/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useCallback, useState, useEffect } from 'react';
import MUIRichTextEditor from 'mui-rte';
import { convertFromHTML } from 'draft-js';
import { convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
var EntityFieldRichText = function (_a) {
    var label = _a.label, value = _a.value, handler = _a.handler, error = _a.error, isEditing = _a.isEditing, onClick = _a.onClick;
    var _b = useState(''), val = _b[0], setVal = _b[1];
    useEffect(function () {
        var contentHTML = convertFromHTML(value || '');
        var state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap);
        setVal(JSON.stringify(convertToRaw(state)));
    }, [value]);
    var onChange = useCallback(function (data) {
        if (!handler)
            return;
        var text = draftToHtml(convertToRaw(data.getCurrentContent()));
        handler(text || '');
    }, [handler]);
    return isEditing ? (React.createElement("div", null,
        React.createElement(MUIRichTextEditor, { label: label, value: val || '', onChange: onChange, error: !!error, controls: [
                'title',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'undo',
                'redo',
                'numberList',
                'bulletList',
                'quote',
                'clear',
            ] }))) : ((value && (React.createElement("div", { onClick: onClick, dangerouslySetInnerHTML: { __html: value } }))) || React.createElement("div", null, "\u00A0"));
};
export { EntityFieldRichText };
