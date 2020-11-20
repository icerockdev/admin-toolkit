/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureController } from './index';
import { FeatureGetReadResult } from '../../types';
export declare function controllerGetRead<T extends Record<string, any>>(controller: FeatureController<T>): Generator<Promise<FeatureGetReadResult<T>>, void, FeatureGetReadResult<T>>;
