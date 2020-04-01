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
}

interface IProps {
  label: string;
  data: RegionData;
  value: any;
  fields: IEntityField[];
  error: string;
  options: { getRegionsUrl: string };
  handler: (val: any) => void;
  withToken: (req: any, args: any) => any;
}

interface CityRegion {
  label: string;
  value: number;
}

const CitySelectField: FC<IProps> = observer(
  ({ data, label, value, handler, error, options, withToken }) => {
    const [cities, setCities] = useState<CityRegion[]>([]);

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

    const onRegionChange = useCallback(
      async (event: ChangeEvent<{ value: any }>) => {
        handler(parseInt(event.target.value) || null);
      },
      [data, options, handler]
    );

    return (
      <div>
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

            {cities.length > 0 &&
              cities.map((city) => (
                <MenuItem key={city.value} value={city.value}>
                  {city.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    );
  }
);

export { CitySelectField };
