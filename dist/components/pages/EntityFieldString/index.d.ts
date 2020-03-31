/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC, MouseEventHandler } from 'react';
declare type IProps = {
    label: string;
    value: any;
    error?: string;
    isEditing?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    handler?: (val: any) => void;
} & Record<string, any>;
declare const EntityFieldString: FC<IProps>;
export { EntityFieldString };
