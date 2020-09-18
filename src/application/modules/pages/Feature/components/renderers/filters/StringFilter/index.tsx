import React, { FC, useCallback, useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { FeatureFilterComponentProps } from '~/application/modules/pages/Feature/types/filters';
import styles from './styles.module.scss';
import { FilterWrapper } from '~/application/modules/pages/Feature/components/filters/FilterWrapper';

const StringFilter: FC<FeatureFilterComponentProps> = ({
  label,
  name,
  value: initialValue,
  onChange,
  onReset,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChangeHandler = useCallback((event) => setValue(event.target.value), [
    setValue,
  ]);

  const onBlur = useCallback(() => {
    onChange(value);
  }, [onChange, value, name]);

  const onClear = useCallback(() => {
    onReset();
  }, [onReset]);

  useEffect(() => {
    if (initialValue !== value) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <FilterWrapper onClear={onClear}>
      <div className={styles.input}>
        <TextField
          label={label}
          value={value || ''}
          onChange={onChangeHandler}
          variant="outlined"
          onBlur={onBlur}
        />
      </div>
    </FilterWrapper>
  );
};

export { StringFilter };
