/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Entity, ENTITY_ACTIONS, ENTITY_FIELD_RENDERS, IPageProps, UserRole } from "~/application";
import { FC, MouseEventHandler } from "react";

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
  permissions: Partial<Record<'update' | 'create' | 'list' | 'view', UserRole[]>>;

  api?: Record<typeof ENTITY_ACTIONS[keyof typeof ENTITY_ACTIONS],
    { url: string; method: string }>;

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
