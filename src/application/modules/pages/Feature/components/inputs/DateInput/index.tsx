import React, { FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/src/typings/date';
import { formatRFC3339, isDate, isValid, parseISO } from 'date-fns';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';
import { useFeature } from '~/utils/hooks';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { FeatureInputProps } from '~/application/modules/pages/Feature/types/field';

type IProps = FeatureInputProps;

const DateInput: FC<IProps> = observer(({ value, label, error, onChange }) => {
  const feature = useFeature();

  const parsedValue = useMemo<MaterialUiPickersDate>(() => {
    if (isDate(value)) return value as Date;

    const parsed = value && parseISO(value);

    if (!isDate(parsed)) return null;

    return parsed;
  }, [value]);

  const handler = useCallback(
    (val: MaterialUiPickersDate) => {
      if (!value || !handler || !isValid(value)) return;

      if (!val) return;

      onChange(formatRFC3339(val));
    },
    [onChange]
  );

  return (
    <Placeholder isLoading={feature.data.isLoading} width="100%" height="56px">
      <DatePicker
        mask="__.__.____"
        renderInput={(props) => (
          <TextField
            variant="outlined"
            {...props}
            label={label}
            error={!!error}
            helperText={error}
            placeholder=""
            className={classNames(
              styles.input,
              'feature-read__input feature-read__input_date'
            )}
          />
        )}
        value={parsedValue}
        onChange={handler}
      />
    </Placeholder>
  );
});

export { DateInput };
