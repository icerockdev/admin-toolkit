/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from "react";
import {
  EntityFieldBase64Image,
  EntityFieldBoolean,
  EntityFieldDate,
  EntityFieldDateRange,
  EntityFieldDateTime,
  EntityFieldNumber,
  EntityFieldPhone,
  EntityFieldReferenceSelect,
  EntityFieldRichText,
  EntityFieldSelect,
  EntityFieldString,
  EntityFieldTextarea
} from "~/application";

export const ENTITY_FIELD_RENDERS = {
  string: EntityFieldString,
  textarea: EntityFieldTextarea,
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
export const ENTITY_REFERENCE_FIELDS = {
  referenceSelect: true,
};
// getFieldRenderer returns field-type specific renderer
export const getEntityFieldRenderer = (type: string = 'string'): FC<any> => {
  const key = Object.prototype.hasOwnProperty.call(ENTITY_FIELD_RENDERS, type)
    ? type
    : 'string';

  return ENTITY_FIELD_RENDERS[key as keyof typeof ENTITY_FIELD_RENDERS] as FC<any>;
};
export const ENTITY_SORT_DIRS: Record<string, 'asc' | 'desc'> = {
  ASC: 'asc',
  DESC: 'desc',
};
export const ENTITY_FILTER_TYPES = {
  TEXT: 'TEXT',
  SELECT: 'SELECT',
  NUMBER: 'NUMBER',
  DATE: 'DATE',
};
export const ENTITY_ACTIONS = {
  CREATE: 'create',
  GET: 'get',
  LIST: 'list',
  DELETE: 'delete',
  UPDATE: 'update',
};
export const ENTITY_ERRORS = {
  CANT_UPDATE_ITEM: 'messages:Failed to update',
  CANT_LOAD_ITEMS: 'messages:Items load failed',
  FIELD_IS_REQUIRED: 'messages:Required field',
  INCORRECT_INPUT: 'messages:Check all fields',
};
