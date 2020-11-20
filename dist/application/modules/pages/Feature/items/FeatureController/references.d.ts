/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureController } from './index';
export declare function controllerGetReferences<T extends Record<string, any>>(controller: FeatureController<T>): Generator<Promise<void>, void, unknown>;
