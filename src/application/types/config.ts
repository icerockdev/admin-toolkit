/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Page } from '~/application/modules/Page';
import { AuthProvider } from '~/application/modules/AuthProvider';

export interface IConfigProps {
  logo: string;
  title: string;
  name: string;
  pages: Page[];
  auth: AuthProvider;
}