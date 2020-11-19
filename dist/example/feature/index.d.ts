/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Feature } from '../../application/modules/pages/Feature';
export declare type IFields = {
    id: number;
    name: string;
    age: number;
    role: number;
    status: number;
    birthDate: string;
    description: string;
    nested: {
        index: number;
        value: string;
    };
};
declare const _default: Feature<IFields>;
export default _default;
