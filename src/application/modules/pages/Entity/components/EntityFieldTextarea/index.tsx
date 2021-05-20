/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback } from 'react';
import { TextField } from '@material-ui/core';
import { IEntityFieldProps } from '~/application';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';

type IProps = IEntityFieldProps & {};

const EntityFieldTextarea: FC<IProps> = observer(
  ({label, value, handler, error, isEditing, onClick, placeholder}) => {
    const onChange = useCallback(
      (event) => {
        if (!handler) return;

        handler(event.target.value);
      },
      [value, handler]
    );

    return isEditing ? (
      <div>
        <TextField
          multiline
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
      <pre
        onClick={onClick}
        className={styles.pre}
      >
        {value ? value.replace(/(<([^>]+)>)/gi, '') : ''}
      </pre>
    );
  }
);

export { EntityFieldTextarea };
