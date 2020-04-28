/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from 'react';
import { IEntityField } from '../..';
interface IProps {
    name: string;
    fields: IEntityField[];
    data?: Record<string, any>;
    error?: string;
    isEditing?: boolean;
    isFiltering?: boolean;
    handler?: (val: any) => void;
    withToken?: (req: any, args: any) => void;
}
declare const EntityField: FC<IProps>;
export { EntityField };
