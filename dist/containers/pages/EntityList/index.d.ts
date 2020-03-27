/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from 'react';
import { IEntityField } from '../../../types/entity';
interface IProps {
    isLoading: boolean;
    fields: IEntityField[];
    data: Record<string, string>[];
    url: string;
    canView: boolean;
    canEdit: boolean;
}
declare const EntityList: FC<IProps>;
export { EntityList };
