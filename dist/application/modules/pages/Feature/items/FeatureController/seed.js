import { assocPath, hasPath } from 'ramda';
/**
 * Fills features' editor data with default values
 */
export function controllerSeedData(controller) {
    var initialData = controller.feature.fieldsOfCurrentMode.reduce(function (acc, field) {
        // Set default value
        if (typeof field.defaultValue !== 'undefined')
            return assocPath(field.fieldPath, field.defaultValue)(acc);
        var path = field.fieldPath.slice(0, field.fieldPath.length - 1);
        // Reacreate empty path structure
        if (field.fieldPath.length > 1 && !hasPath(path, acc))
            return assocPath(path, {})(acc);
        // Don't change anything
        return acc;
    }, {});
    controller.feature.data.editor = initialData;
}
