/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Config } from '../modules/config/Config';
import { UserRole } from '..';
export interface IPageProps {
    roles?: UserRole[];
    parent: Config;
    title: string;
    menu: {
        enabled: boolean;
        childFields?: Array<MenuItem>;
    } & MenuItem;
}
export declare type MenuItem = {
    label: string;
    url: string;
};
