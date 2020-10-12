import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { observer } from 'mobx-react';
import { FeatureInputProps } from '~/application/modules/pages/Feature/types/field';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import styles from './styles.module.scss';
import { Autocomplete } from '@material-ui/lab';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';
import { useFeature } from '~/application/utils/hooks';

type IProps = FeatureInputProps & {
  variants: Record<any, any>;
  autocomplete: boolean;
  isLoadingReference?: boolean;
};

type AutocompleteOption = {
  title: string;
  value: any;
};

const SelectInput: FC<IProps> = observer(
  ({
    onChange,
    label,
    value,
    error,
    disabled,
    variants,
    autocomplete,
    isLoadingReference,
    isLoading = false,
  }) => {
    const ref = useRef<HTMLLabelElement>(null);
    const feature = useFeature();

    const [labelWidth, setLabelWidth] = useState(0);

    const onChangeHandler = useCallback(
      (event) => onChange(event.target.value),
      [onChange]
    );

    const options = useMemo<AutocompleteOption[]>(
      () =>
        Object.entries(variants).map(([value, title]) => ({
          title,
          value,
        })),
      [variants]
    );

    const selected = useMemo(
      () =>
        options.find((option) => String(option.value) === String(value)) || '',
      [options, value]
    );

    const onAutocompleteChange = useCallback(
      (_, { value }) => onChange(value),
      [onChange]
    );

    useEffect(() => {
      setLabelWidth((ref.current && ref.current.clientWidth) || 0);
    }, [ref.current]);

    return (
      <Placeholder
        isLoading={isLoading || !!isLoadingReference}
        width="100%"
        height="48px"
      >
        <div className={styles.select}>
          {autocomplete ? (
            <Autocomplete
              disableClearable
              value={selected}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.title
              }
              options={options}
              onChange={onAutocompleteChange}
              renderInput={(params: TextFieldProps) => (
                <TextField
                  {...params}
                  variant="filled"
                  placeholder="Поиск"
                  label={label}
                  disabled={disabled}
                  error={!!error}
                  helperText={error}
                  size="small"
                  fullWidth
                />
              )}
            />
          ) : (
            <TextField
              variant="filled"
              select
              label={label}
              value={value || ''}
              onChange={onChangeHandler}
              style={{ minWidth: labelWidth + 40 }}
              disabled={disabled}
              helperText={error}
              error={!!error}
              size="small"
              fullWidth
            >
              {options &&
                Object.keys(variants).map((item) => (
                  <MenuItem key={item} value={item}>
                    {variants[item]}
                  </MenuItem>
                ))}
            </TextField>
          )}
        </div>
      </Placeholder>
    );
  }
);

export { SelectInput };
