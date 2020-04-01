/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { IEntityField } from '~/application';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Axios from 'axios';
import { observer } from 'mobx-react';

interface RegionData {
  regionId: number | null;
  cityId: number | null;
  city: { name: string; id: number };
}

interface IProps {
  label: string;
  data: RegionData;
  value: any;
  fields: IEntityField[];
  error: string;
  options: { getRegionsUrl: string };
  isEditing?: boolean;
  handler: (val: any) => void;
  withToken: (req: any, args: any) => any;
}

interface City {
  label: string;
  value: number;
}

const CitySelectField: FC<IProps> = observer(
  ({ data, label, value, handler, error, options, withToken, isEditing }) => {
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
      if (!data.regionId) {
        setCities([]);
      }

      (async () => {
        const result = await withToken(
          ({ token }: { token: string }) =>
            Axios.get(`${options.getRegionsUrl}/${data.regionId}/cities`, {
              headers: { Authorization: token },
            }).catch((e) => e),
          {}
        );

        if (!result?.data?.data) return;

        setCities(result.data.data);
      })();
    }, [options.getRegionsUrl, data.regionId]);

    const onCityChange = useCallback(
      async (event: ChangeEvent<{ value: any }>) => {
        handler(parseInt(event.target.value) || null);
      },
      [data, options, handler]
    );

    return isEditing ? (
      <FormControl variant="outlined">
        <InputLabel htmlFor={label}>{label}</InputLabel>

        <Select
          variant="outlined"
          id={label}
          name={label}
          label={label}
          value={value || ''}
          onChange={onCityChange}
          error={!!error}
          inputProps={{ className: 'select' }}
        >
          <MenuItem value="">...</MenuItem>

          {cities.length > 0 &&
            cities.map((city) => (
              <MenuItem key={city.value} value={city.value}>
                {city.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    ) : (
      <div>{data?.city?.name || ''}</div>
    );
  }
);

export { CitySelectField };
