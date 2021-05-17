/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, useMemo } from 'react';
import { TextField } from '@material-ui/core';
import { IEntityFieldProps } from '~/application';
import { observer } from 'mobx-react';

type IProps = IEntityFieldProps & {};

const EntityFieldString: FC<IProps> = observer(
  ({ label, value, handler, error, isEditing, onClick, placeholder }) => {
    const text = useMemo(
      () =>
        (value &&
          value
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(
              /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/gi,
              '<a href="$1" target="blank" rel="nofollow">$1</a>'
            )) ||
        '',
      [value]
    );

    const onChange = useCallback(
      (event) => {
        if (!handler) return;

        handler(event.target.value);
      },
      [handler]
    );

    return isEditing ? (
      <div>
        <TextField
          label={label}
          value={value || ''}
          onChange={onChange}
          error={!!error}
          helperText={error}
          variant="outlined"
          placeholder={placeholder || ''}
        />
      </div>
    ) : (
      <div
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: text ? String(text) : '&nbsp;' }}
      />
    );
  }
);

export { EntityFieldString };
