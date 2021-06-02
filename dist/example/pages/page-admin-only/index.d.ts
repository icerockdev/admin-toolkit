/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Page } from '../../../application';
declare class AdminOnlyPage extends Page {
    get output(): () => JSX.Element;
}
declare const _default: AdminOnlyPage;
export default _default;
