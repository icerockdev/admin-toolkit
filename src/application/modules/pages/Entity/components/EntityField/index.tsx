/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, createElement, useMemo } from 'react';
import { getEntityFieldRenderer } from '~/application';
import { IEntityFieldProps } from '~/application/types';
import { observer } from 'mobx-react';

interface IProps extends IEntityFieldProps {}

const EntityField: FC<IProps> = observer(
  ({
    name,
    fields,
    data = {},
    error = '',
    isEditing,
    isFiltering,
    handler,
    entity,
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
      field.component
        ? field.component
        : getEntityFieldRenderer(field.type || typeof data[field.name]),
      {
        value: Object.prototype.hasOwnProperty.call(data, field.name)
          ? data[field.name]
          : null,
        label: `${field.label || field.name}${
          field.required && isEditing ? ' *' : ''
        }`,
        name,
        error,
        isEditing,
        isFiltering,
        handler,
        entity,
        options: field.options || {},
        data, // for custom fields
        fields, // for custom fields
        withToken, // for custom fields
        placeholder: field.placeholder,
        mask: field.mask,
      } as IEntityFieldProps
    );
  }
);

export { EntityField };
