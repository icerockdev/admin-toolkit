/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC, MouseEventHandler } from 'react';
declare type IProps = {
    label: string;
    value: any;
    isEditing?: boolean;
    handler?: (val: any) => void;
    error?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    options?: Record<any, any>;
} & Record<string, any>;
declare const EntityFieldReferenceSelect: FC<IProps>;
export { EntityFieldReferenceSelect };
