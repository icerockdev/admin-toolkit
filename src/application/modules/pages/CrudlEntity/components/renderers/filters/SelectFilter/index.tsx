import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import { CrudlFilterComponentProps } from '~/application/modules/pages/CrudlEntity/types/filters';
import styles from './styles.module.scss';
import { Close } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';

type IProps = CrudlFilterComponentProps & {
  variants: Record<any, any>;
  autocomplete: boolean;
};

type AutocompleteOption = {
  title: string;
  value: any;
};

const SelectFilter: FC<IProps> = ({
  label,
  name,
  value,
  variants,
  autocomplete,
  onChange,
  onReset,
}) => {
  const ref = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const onChangeHandler = useCallback(
    (event) => onChange(name, event.target.value),
    [onChange]
  );

  const onAutocompleteChange = useCallback(
    (_, { value }) => onChange(name, value),
    [onChange]
  );

  const onClear = useCallback(() => {
    onReset(name);
  }, [onReset]);

  const options = useMemo<AutocompleteOption[]>(
    () =>
      Object.entries(variants).map(([value, title]) => ({
        title,
        value,
      })),
    [variants]
  );

  const selected = useMemo(
    () => options.find((option) => option.value === value) || '',
    [options, value]
  );

  useEffect(() => {
    setLabelWidth((ref.current && ref.current.clientWidth) || 0);
  }, [ref.current]);

  return (
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
              variant="outlined"
              placeholder="Поиск"
              label={label}
            />
          )}
        />
      ) : (
        <FormControl variant="outlined">
          <InputLabel
            htmlFor={label}
            style={{ whiteSpace: 'nowrap' }}
            ref={ref}
          >
            {label}
          </InputLabel>

          <Select
            variant="outlined"
            id={label}
            name={label}
            value={value}
            labelWidth={labelWidth}
            onChange={onChangeHandler}
            style={{ minWidth: labelWidth + 40 }}
          >
            {options &&
              Object.keys(variants).map((item) => (
                <MenuItem key={item} value={item}>
                  {variants[item]}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      <div className={styles.close} onClick={onClear}>
        <Close />
      </div>
    </div>
  );
};

export { SelectFilter };
