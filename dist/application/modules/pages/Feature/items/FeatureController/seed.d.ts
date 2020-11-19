/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FeatureController } from './index';
/**
 * Fills features' editor data with default values
 */
export declare function controllerSeedData<T extends Record<string, any>>(controller: FeatureController<T>): void;
