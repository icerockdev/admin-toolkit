/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { FeatureRenderer } from './items/FeatureRenderer';
export var FEATURE_DEFAULT_RENDERER = new FeatureRenderer();
export var FEATURE_DEFAULT_FEATURES = {
    create: true,
    read: true,
    update: true,
    delete: true,
    list: true,
    export: false,
};
