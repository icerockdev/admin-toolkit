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

interface VehicleData {
  type: number;
  vehicleId: number | null;
  vehicle: string;
}

interface IProps {
  label: string;
  data: VehicleData;
  value: any;
  fields: IEntityField[];
  error: string;
  options: { getVehiclesUrl: string };
  isEditing?: boolean;
  handler: (val: any) => void;
  withToken: (req: any, args: any) => any;
}

interface Vehicle {
  label: string;
  value: number;
}

const VehicleSelectField: FC<IProps> = observer(
  ({ data, label, value, handler, error, options, withToken, isEditing }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
      (async () => {
        const result = await withToken(
          ({ token }: { token: string }) =>
            Axios.get(`${options.getVehiclesUrl}/${data.type}/list`, {
              headers: { Authorization: token },
            }).catch((e) => e),
          {}
        );

        if (!result?.data?.data) return;

        setVehicles(result.data.data);
      })();
    }, [options.getVehiclesUrl, data.type]);

    const onVehicleChange = useCallback(
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
          onChange={onVehicleChange}
          error={!!error}
          inputProps={{ className: 'select' }}
        >
          <MenuItem value="">...</MenuItem>

          {vehicles.length > 0 &&
            vehicles.map((vehicle) => (
              <MenuItem key={vehicle.value} value={vehicle.value}>
                {vehicle.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    ) : (
      <div>{data?.vehicle || ''}</div>
    );
  }
);

export { VehicleSelectField };
