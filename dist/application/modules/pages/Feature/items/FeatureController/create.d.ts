/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureController } from './index';
import { FeaturePostCreateResult } from '../../types';
export declare function controllerPostCreate<T extends Record<string, any> = Record<string, any>>(controller: FeatureController<T>): Generator<Promise<FeaturePostCreateResult<T>>, void, FeaturePostCreateResult<T>>;
