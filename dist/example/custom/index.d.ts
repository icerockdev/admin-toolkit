/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

/// <reference types="react" />
import { Entity } from '../../application';
declare class CustomEntity extends Entity {
    get output(): () => JSX.Element;
}
declare const _default: CustomEntity;
export default _default;
