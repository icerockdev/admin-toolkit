import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { FeatureFilterComponentProps } from '~/application/modules/pages/Feature/types/filters';
import styles from './styles.module.scss';
import { FilterWrapper } from '~/application/modules/pages/Feature/components/filters/FilterWrapper';
import { DatePicker, DateRangePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/src/typings/date';
import { formatRFC3339, isDate, isValid, parseISO } from 'date-fns';

type IProps = FeatureFilterComponentProps & { isRange: boolean };

const DateFilter: FC<IProps> = ({
  label,
  name,
  value: initialValue,
  isRange,
  onChange,
  onReset,
}) => {
  const [value, setValue] = useState(initialValue);

  const onRangeChange = useCallback(
    ([start, end]: [MaterialUiPickersDate, MaterialUiPickersDate]) => {
      if (!start || !end || !isValid(start) || !isValid(end)) return;

      const val = [start, end].map((it) => formatRFC3339(it)).join(',');

      onChange(val);
    },
    [onChange]
  );

  const onSingleChange = useCallback(
    (val: MaterialUiPickersDate) => {
      if (!val || !isValid(val)) return;

      onChange(formatRFC3339(val));
    },
    [onChange]
  );

  const rangeValue = useMemo<
    [MaterialUiPickersDate, MaterialUiPickersDate]
  >(() => {
    if (!value || !isRange || typeof value !== 'string') return [null, null];

    const [start, end] = value.split(',').map((it: string) => parseISO(it));

    if (!isDate(start) || !isDate(end)) return [null, null];

    return [start, end];
  }, [value, isRange]);

  const singleValue = useMemo<MaterialUiPickersDate>(() => {
    if (isDate(value)) return value;

    const parsed = value && parseISO(value);

    if (!isDate(parsed)) return null;

    return parsed;
  }, [value]);

  useEffect(() => {
    if (initialValue !== value) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <FilterWrapper onClear={onReset}>
      <div className={styles.datepicker}>
        <FormControl className={styles.control}>
          {isRange && (
            <DateRangePicker
              mask="dd.MM.yyyy"
              label={label}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField
                    {...startProps}
                    variant="outlined"
                    label={label}
                    helperText=""
                  />

                  <TextField
                    {...endProps}
                    variant="outlined"
                    helperText=""
                    label=""
                  />
                </>
              )}
              value={rangeValue}
              onChange={onRangeChange}
            />
          )}

          {!isRange && (
            <DatePicker
              mask="__.__.____"
              renderInput={(props) => (
                <TextField
                  variant="outlined"
                  {...props}
                  label={label}
                  helperText=""
                  placeholder=""
                />
              )}
              value={singleValue}
              onChange={onSingleChange}
            />
          )}
        </FormControl>
      </div>
    </FilterWrapper>
  );
};

export { DateFilter };
