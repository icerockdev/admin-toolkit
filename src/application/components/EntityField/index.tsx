import React, { FC, createElement, useMemo } from 'react';
import { IEntityField, getEntityFieldRenderer } from '~/application';

interface IProps {
  name: string;
  fields: IEntityField[];
  data?: Record<string, any>;
  error?: string;
  isEditing?: boolean;
  handler?: (val: any) => void;
  withToken?: (req: any, args: any) => void;
}

const EntityField: FC<IProps> = ({
  name,
  fields,
  data = {},
  error = '',
  isEditing,
  handler,
  withToken = (cb, args) => cb(args),
}) => {
  const field = useMemo(() => fields.find((field) => field.name === name), [
    fields,
    name,
  ]);

  if (!field) {
    return <div />;
  }

  return createElement(
    field.type === 'custom' && field.component
      ? field.component
      : getEntityFieldRenderer(field.type || typeof data[field.name]),
    {
      value: Object.prototype.hasOwnProperty.call(data, field.name)
        ? data[field.name]
        : null,
      label: `${field.label || field.name}${
        field.required && isEditing ? ' *' : ''
      }`,
      error,
      isEditing,
      handler,
      options: field.options || {},
      data, // for custom fields
      fields, // for custom fields
      withToken, // for custom fields
    }
  );
};

export { EntityField };
