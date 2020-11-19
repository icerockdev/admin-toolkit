/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Feature } from '../..';
export declare type GetReferenceAllProps = {
    feature: Feature;
    host: string;
    authorization: string;
    name: string;
};
export declare type GetReferenceAll = (props: GetReferenceAllProps) => Promise<any>;
export declare const getReferenceAll: GetReferenceAll;
