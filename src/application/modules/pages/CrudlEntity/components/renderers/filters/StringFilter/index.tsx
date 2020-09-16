import React, { FC, useCallback, useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { CrudlFilterComponentProps } from '~/application/modules/pages/CrudlEntity/types/filters';
import styles from './styles.module.scss';
import { CrudlFilterWrapper } from '~/application/modules/pages/CrudlEntity/components/filters/CrudlFilterWrapper';

const StringFilter: FC<CrudlFilterComponentProps> = ({
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
    onChange(name, value);
  }, [onChange, value, name]);

  const onClear = useCallback(() => {
    onReset(name);
  }, [onReset]);

  useEffect(() => {
    if (initialValue !== value) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <CrudlFilterWrapper onClear={onClear}>
      <div className={styles.input}>
        <TextField
          label={label}
          value={value || ''}
          onChange={onChangeHandler}
          variant="outlined"
          onBlur={onBlur}
        />
      </div>
    </CrudlFilterWrapper>
  );
};

export { StringFilter };