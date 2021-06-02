/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Page } from '../../../application';
declare class CustomPage extends Page {
    get output(): () => JSX.Element;
}
declare const _default: CustomPage;
export default _default;
