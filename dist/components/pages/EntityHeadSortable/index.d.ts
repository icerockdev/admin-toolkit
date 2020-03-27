/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC, HTMLAttributes } from 'react';
declare type IProps = HTMLAttributes<HTMLDivElement> & {
    field: string;
    active?: boolean;
    direction?: 'desc' | 'asc';
    onSortChange: (field: string) => void;
};
declare const EntityHeadSortable: FC<IProps>;
export { EntityHeadSortable };
