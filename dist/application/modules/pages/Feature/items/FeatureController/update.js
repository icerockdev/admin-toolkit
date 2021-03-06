/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { toJS } from 'mobx';
export function controllerPostUpdate(controller) {
    var feature, id, _a, data, errors, e_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                feature = controller.feature;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                feature.data.isLoading = true;
                id = controller.getIdFromUrl();
                return [4 /*yield*/, feature.api.update(id, toJS(feature.data.editorDataForCurrentMode))];
            case 2:
                _a = _c.sent(), data = _a.data, errors = _a.errors;
                if (errors) {
                    feature.data.errors = errors;
                    return [2 /*return*/];
                }
                feature.data.isLoading = false;
                if (typeof feature.getItemId(data) !== 'undefined') {
                    feature.goToRead(feature.getItemId(data));
                }
                else {
                    feature.goToList();
                }
                feature.data.clearEditorData();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _c.sent();
                controller.feature.data.isLoading = false;
                (_b = controller.feature.parent) === null || _b === void 0 ? void 0 : _b.notifications.showError(e_1.toString());
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}
