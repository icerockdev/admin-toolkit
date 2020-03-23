/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Config } from "~/containers/pages/Config";

export interface IPageProps {
  parent: Config;
  title: string;
  menu: {
    enabled: boolean;
    label: string;
    url: string;
  };
}
