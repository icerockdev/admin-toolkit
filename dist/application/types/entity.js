/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { EntityFieldString } from '../../components/pages/EntityFieldString';
import { EntityFieldBoolean } from '../../components/pages/EntityFieldBoolean';
import { EntityFieldDate } from '../../components/pages/EntityFieldDate';
import { EntityFieldSelect } from '../../components/pages/EntityFieldSelect';
import { EntityFieldPhone } from '../../components/pages/EntityFieldPhone';
import { EntityFieldRichText } from '../../components/pages/EntityFieldRichText';
import { EntityFieldBase64Image } from '../../components/pages/EntityFieldBase64';
import { EntityFieldNumber } from '../../components/pages/EntityFieldNumber';
import { EntityFieldDateTime } from '../../components/pages/EntityFieldDatetime';
import { EntityFieldReferenceSelect } from '../../components/pages/EntityFieldReferenceSelect';
import { EntityFieldDateRange } from '../../components/pages/EntityFieldDateRange';
export var ENTITY_FIELD_RENDERS = {
    string: EntityFieldString,
    date: EntityFieldDate,
    datetime: EntityFieldDateTime,
    daterange: EntityFieldDateRange,
    boolean: EntityFieldBoolean,
    select: EntityFieldSelect,
    phone: EntityFieldPhone,
    richtext: EntityFieldRichText,
    base64image: EntityFieldBase64Image,
    number: EntityFieldNumber,
    referenceSelect: EntityFieldReferenceSelect,
};
export var ENTITY_REFERENCE_FIELDS = {
    referenceSelect: true,
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
    CANT_UPDATE_ITEM: "Can't update item",
    CANT_LOAD_ITEMS: "Can't load items",
    FIELD_IS_REQUIRED: 'This field is required',
    INCORRECT_INPUT: 'Check all inputs',
};
