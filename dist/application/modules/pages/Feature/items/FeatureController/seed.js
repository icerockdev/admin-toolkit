var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * Fills features' editor data with default values
 */
export function controllerSeedData(controller) {
    var initialData = controller.feature.fieldsOfCurrentMode.reduce(function (acc, field) {
        var _a;
        return typeof field.defaultValue === 'undefined'
            ? acc
            : __assign(__assign({}, acc), (_a = {}, _a[field.name] = field.defaultValue, _a));
    }, {});
    controller.feature.data.editor = initialData;
}
