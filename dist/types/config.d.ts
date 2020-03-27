/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Page } from '../containers/pages/Page';
import { AuthProvider } from '../containers/pages/AuthProvider';
export interface IConfigProps {
    logo: string;
    title: string;
    name: string;
    pages: Page[];
    auth: AuthProvider;
}
