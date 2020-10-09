import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react';
import { TextField } from '@material-ui/core';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';
import { FeatureInputProps } from '~/application/modules/pages/Feature/types/field';

const StringInput: FC<FeatureInputProps<string>> = observer(
  ({ value, label, error, onChange, isLoading = false }) => {
    const handler = useCallback((event) => onChange(event.target.value), [
      onChange,
    ]);

    return (
      <Placeholder isLoading={isLoading} width="100%" height="46px">
        <TextField
          value={value || ''}
          onChange={handler}
          variant="filled"
          label={label}
          error={!!error}
          helperText={error}
          size="small"
          className={classNames(
            styles.input,
            'feature-read__input feature-read__input_string'
          )}
          fullWidth
        />
      </Placeholder>
    );
  }
);

export { StringInput };
