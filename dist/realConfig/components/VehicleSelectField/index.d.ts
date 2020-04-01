/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from 'react';
import { IEntityField } from '../../../application';
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
    options: {
        getVehiclesUrl: string;
    };
    isEditing?: boolean;
    handler: (val: any) => void;
    withToken: (req: any, args: any) => any;
}
declare const VehicleSelectField: FC<IProps>;
export { VehicleSelectField };
