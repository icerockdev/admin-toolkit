/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC, MouseEventHandler } from 'react';
declare type IProps = {
    value: any;
    isEditing?: boolean;
    error?: string;
    handler?: (val: any) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
} & Record<string, any>;
declare const EntityFieldBoolean: FC<IProps>;
export { EntityFieldBoolean };
