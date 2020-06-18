/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { createElement, useMemo } from 'react';
import { getEntityFieldRenderer } from '../..';
var EntityField = function (_a) {
    var name = _a.name, fields = _a.fields, _b = _a.data, data = _b === void 0 ? {} : _b, _c = _a.error, error = _c === void 0 ? '' : _c, isEditing = _a.isEditing, isFiltering = _a.isFiltering, handler = _a.handler, entity = _a.entity, _d = _a.withToken, withToken = _d === void 0 ? function (cb, args) { return cb(args); } : _d;
    var field = useMemo(function () { return fields.find(function (field) { return field.name === name; }); }, [
        fields,
        name,
    ]);
    if (!field) {
        return React.createElement("div", null);
    }
    return createElement(field.component
        ? field.component
        : getEntityFieldRenderer(field.type || typeof data[field.name]), {
        value: Object.prototype.hasOwnProperty.call(data, field.name)
            ? data[field.name]
            : null,
        label: "" + (field.label || field.name) + (field.required && isEditing ? ' *' : ''),
        name: name,
        error: error,
        isEditing: isEditing,
        isFiltering: isFiltering,
        handler: handler,
        entity: entity,
        options: field.options || {},
        data: data,
        fields: fields,
        withToken: withToken,
    });
};
export { EntityField };
