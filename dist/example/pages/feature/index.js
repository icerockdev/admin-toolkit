/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { Feature } from '../../../application';
import { createFeature, deleteFeature, getFeature, getFeatureList, getRolesAll, updateFeature, } from './api';
import { FEATURE_FIELDS } from './fields';
export default new Feature('Experimental: Feature', '/feature', {
    getItemTitle: function (data) { return data.name; },
    fields: FEATURE_FIELDS,
    api: {
        methods: {
            list: getFeatureList,
            read: getFeature,
            create: createFeature,
            update: updateFeature,
            delete: deleteFeature,
        },
        urls: {
            list: '/test',
        },
        references: {
            role: {
                url: '/test/',
                all: getRolesAll,
            },
        },
    },
});
