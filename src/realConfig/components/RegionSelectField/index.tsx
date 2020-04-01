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
  region: { id: number; name: string };
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

interface CityRegion {
  label: string;
  value: number;
}

const RegionSelectField: FC<IProps> = observer(
  ({ data, label, value, handler, error, options, withToken, isEditing }) => {
    const [regions, setRegions] = useState<CityRegion[]>([]);

    useEffect(() => {
      (async () => {
        const result = await withToken(
          ({ token }: { token: string }) =>
            Axios.get(options.getRegionsUrl, {
              headers: { Authorization: token },
            }).catch((e) => e),
          {}
        );

        if (!result?.data?.data) return;

        setRegions(result.data.data);
      })();
    }, [options.getRegionsUrl]);

    const onRegionChange = useCallback(
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
          onChange={onRegionChange}
          error={!!error}
          inputProps={{ className: 'select' }}
        >
          <MenuItem value="">...</MenuItem>

          {regions.length > 0 &&
            regions.map((region) => (
              <MenuItem key={region.value} value={region.value}>
                {region.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    ) : (
      <div>{data?.region?.name}</div>
    );
  }
);

export { RegionSelectField };
