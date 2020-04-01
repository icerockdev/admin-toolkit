/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from 'react';
import { IEntityField } from '../../../application';
interface RegionData {
    regionId: number | null;
    cityId: number | null;
    city: {
        name: string;
        id: number;
    };
}
interface IProps {
    label: string;
    data: RegionData;
    value: any;
    fields: IEntityField[];
    error: string;
    options: {
        getRegionsUrl: string;
    };
    isEditing?: boolean;
    handler: (val: any) => void;
    withToken: (req: any, args: any) => any;
}
declare const CitySelectField: FC<IProps>;
export { CitySelectField };
