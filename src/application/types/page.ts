/* Copyright (c) 2020-2022 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Config } from '~/application/modules/config/Config';
import { UserRole } from '~/application';

export interface IPageProps {
  roles?: UserRole[];
  parent: Config;
  title: string;
  menu: {
    enabled: boolean;
    childFields?: Array<MenuItem>;
  } & MenuItem;
}

export type MenuItem = { label: string; url: string };
