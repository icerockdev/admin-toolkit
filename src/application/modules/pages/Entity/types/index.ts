/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IPageProps } from '../../../../types/page';
import { EntityFieldString } from '~/application/modules/pages/Entity/components/EntityFieldString';
import { EntityFieldBoolean } from '~/application/modules/pages/Entity/components/EntityFieldBoolean';
import { EntityFieldDate } from '~/application/modules/pages/Entity/components/EntityFieldDate';
import { EntityFieldSelect } from '~/application/modules/pages/Entity/components/EntityFieldSelect';
import { EntityFieldPhone } from '~/application/modules/pages/Entity/components/EntityFieldPhone';
import { EntityFieldRichText } from '~/application/modules/pages/Entity/components/EntityFieldRichText';
import { EntityFieldBase64Image } from '~/application/modules/pages/Entity/components/EntityFieldBase64';
import { FC, MouseEventHandler } from 'react';
import { EntityFieldNumber } from '~/application/modules/pages/Entity/components/EntityFieldNumber';
import { EntityFieldDateTime } from '~/application/modules/pages/Entity/components/EntityFieldDatetime';
import { EntityFieldReferenceSelect } from '~/application/modules/pages/Entity/components/EntityFieldReferenceSelect';
import { Entity } from '../../../index';
import { EntityFieldDateRange } from '~/application/modules/pages/Entity/components/EntityFieldDateRange';
import { UserRole } from '~/application';

export const ENTITY_FIELD_RENDERS = {
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

export const ENTITY_REFERENCE_FIELDS = {
  referenceSelect: true,
};

// getFieldRenderer returns field-type specific renderer
export const getEntityFieldRenderer = (type: string = 'string'): FC<any> => {
  const key = Object.prototype.hasOwnProperty.call(ENTITY_FIELD_RENDERS, type)
    ? type
    : 'string';

  return ENTITY_FIELD_RENDERS[key as keyof typeof ENTITY_FIELD_RENDERS] as FC<
    any
  >;
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
  CANT_UPDATE_ITEM: `Не удалось обновить`,
  CANT_LOAD_ITEMS: `Загрузка не удалась`,
  FIELD_IS_REQUIRED: 'Обязательное поле',
  INCORRECT_INPUT: 'Проверьте все поля',
};

export interface IEntityField {
  name: string;
  label?: string;
  title?: boolean;
  type: keyof typeof ENTITY_FIELD_RENDERS | 'custom';
  sortable?: boolean;
  filterable?: boolean;
  required?: boolean;
  validator?: (val: any, entity: Entity) => string;
  options?: Record<any, any>;
  component?: FC<any>;
  placeholder?: string;
  mask?: string;

  hideInList?: boolean;
  hideInView?: boolean;
  hideInEdit?: boolean;
  hideInCreate?: boolean;
  hideInExport?: boolean;
}

export interface IFilterValue {
  name: string;
  value: any;
}

export interface IEntityProps extends IPageProps {
  fields: IEntityField[];
  editable: boolean;
  viewable: boolean;
  creatable: boolean;
  selectable: boolean;
  exportable: boolean;
  items: number;
  filters: IFilterValue[];
  references: Record<string, IEntityReferenceProps>;
  permissions: Partial<Record<'update' | 'create' | 'list', UserRole[]>>;

  api?: Record<
    typeof ENTITY_ACTIONS[keyof typeof ENTITY_ACTIONS],
    { url: string; method: string }
  >;

  fetchItemsFn?: IEntityFetchFunction;
  updateItemsFn?: IEntityUpdateFunction;
  createItemsFn?: IEntityCreateFunction;
  getItemsFn?: IEntityGetFunction;
}

export interface IEntityFetchFunctionProps {
  url: string;
  page?: number;
  filter?: IFilterValue[];
  sortBy: string;
  sortDir: string;
  count?: number;
  token?: string;
}

export interface IEntityFetchFunctionResult {
  data: {
    list: Record<string, any>[];
    totalCount?: number;
  };
  filterData?: Record<string, any>;
  error?: string;
}

export type IEntityFetchFunction = (
  props: IEntityFetchFunctionProps
) => Promise<IEntityFetchFunctionResult>;

export interface IEntityUpdateFunctionProps {
  url: string;
  id: any;
  token?: string;
  data: Record<string, any>;
}

export interface IEntityUpdateFunctionResult {
  data: Record<string, any>;
  error?: string;
}

export type IEntityUpdateFunction = (
  props: IEntityUpdateFunctionProps
) => Promise<IEntityUpdateFunctionResult>;

export interface IEntityCreateFunctionProps {
  url: string;
  token?: string;
  data: Record<string, any>;
}

export interface IEntityCreateFunctionResult {
  data: Record<string, any>;
  error?: string;
}

export type IEntityCreateFunction = (
  props: IEntityCreateFunctionProps
) => Promise<IEntityCreateFunctionResult>;

export interface IEntityGetFunctionProps {
  url: string;
  token?: string;
  id: any;
}

export interface IEntityGetFunctionResult {
  data: Record<string, any>;
  error?: string;
}

export type IEntityGetFunction = (
  props: IEntityGetFunctionProps
) => Promise<IEntityGetFunctionResult>;

export type IEntityReferenceProps = {
  getMany: (entity: Entity) => Promise<Record<string, any>>;
  getOne?: (id: any) => Promise<Record<string, any>>;
};

export type IEntityFieldProps = {
  name: string;
  fields: IEntityField[];
  data?: Record<string, any>;
  label?: string;
  error?: string;
  isEditing?: boolean;
  entity?: Entity;
  isFiltering?: boolean;
  handler?: (val: any) => void;
  withToken?: (req: any, args: any) => void;
  value?: any;
  onClick?: MouseEventHandler<any>;
  options?: Record<string, any>;
  placeholder?: string;
  mask?: string;
};
