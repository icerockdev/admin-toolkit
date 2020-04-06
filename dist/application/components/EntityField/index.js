import React, { createElement, useMemo } from 'react';
import { getEntityFieldRenderer } from '../..';
var EntityField = function (_a) {
    var name = _a.name, fields = _a.fields, _b = _a.data, data = _b === void 0 ? {} : _b, _c = _a.error, error = _c === void 0 ? '' : _c, isEditing = _a.isEditing, handler = _a.handler, _d = _a.withToken, withToken = _d === void 0 ? function (cb, args) { return cb(args); } : _d;
    var field = useMemo(function () { return fields.find(function (field) { return field.name === name; }); }, [
        fields,
        name,
    ]);
    if (!field) {
        return React.createElement("div", null);
    }
    return createElement(field.type === 'custom' && field.component
        ? field.component
        : getEntityFieldRenderer(field.type || typeof data[field.name]), {
        value: Object.prototype.hasOwnProperty.call(data, field.name)
            ? data[field.name]
            : null,
        label: "" + (field.label || field.name) + (field.required && isEditing ? ' *' : ''),
        error: error,
        isEditing: isEditing,
        handler: handler,
        options: field.options || {},
        data: data,
        fields: fields,
        withToken: withToken,
    });
};
export { EntityField };
