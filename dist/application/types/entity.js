/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { EntityFieldString } from '../../components/pages/EntityFieldString';
import { EntityFieldBoolean } from '../../components/pages/EntityFieldBoolean';
export var ENTITY_FIELD_RENDERS = {
    string: EntityFieldString,
    boolean: EntityFieldBoolean,
};
// getFieldRenderer returns field-type specific renderer
export var getEntityFieldRenderer = function (type) {
    if (type === void 0) { type = 'string'; }
    var key = Object.prototype.hasOwnProperty.call(ENTITY_FIELD_RENDERS, type)
        ? type
        : 'string';
    return ENTITY_FIELD_RENDERS[key];
};
export var ENTITY_SORT_DIRS = {
    ASC: 'asc',
    DESC: 'desc',
};
export var ENTITY_FILTER_TYPES = {
    TEXT: 'TEXT',
    SELECT: 'SELECT',
    NUMBER: 'NUMBER',
    DATE: 'DATE',
};
export var ENTITY_ACTIONS = {
    CREATE: 'create',
    GET: 'get',
    LIST: 'list',
    DELETE: 'delete',
    UPDATE: 'update',
};
export var ENTITY_ERRORS = {
    CANT_LOAD_ITEMS: "Can't load items",
};
