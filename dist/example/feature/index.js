import { Feature } from '../../application/modules/pages/Feature';
import { createFeature, deleteFeature, getFeature, getFeatureList, getRolesAll, updateFeature, } from './api';
import { FEATURE_FIELDS } from './fields';
export default new Feature('Feature', '/feature', {
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
