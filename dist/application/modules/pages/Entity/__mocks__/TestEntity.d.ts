/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Entity, IEntityProps } from "../../../..";
declare class TestEntity extends Entity {
    constructor(fields?: Partial<IEntityProps>);
    updateReferenceOptions: () => Promise<void>;
}
declare const _default: TestEntity;
export default _default;
