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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, computed, extendObservable, observable } from 'mobx';
import { FeatureDataReference } from '../../types/reference';
import { pickBy } from 'ramda';
var FeatureData = /** @class */ (function () {
    function FeatureData(feature) {
        this.feature = feature;
        /**
         * FeatureApi's references dictionary (see this.createReferenceData)
         */
        this.references = {};
        this.isLoading = true;
        /**
         * Values for list
         */
        this.list = [];
        /**
         * Values for single item display
         */
        this.read = {};
        /**
         * Current editor values, copied from read before create/update form appears
         */
        this.editor = {};
        /**
         * Validation error dictionary
         */
        this.errors = {};
    }
    /**
     * Creates editor[fieldname] reference instance for refs from FeatureApi
     * @param refs
     */
    FeatureData.prototype.createReferenceData = function (refs) {
        var _this = this;
        if (refs === void 0) { refs = {}; }
        // fills this.references with fields from Feature
        Object.keys(refs).forEach(function (ref) {
            var _a;
            extendObservable(_this.references, (_a = {},
                _a[ref] = observable(new FeatureDataReference()),
                _a));
        });
    };
    FeatureData.prototype.clearReadData = function () {
        this.read = {};
    };
    FeatureData.prototype.clearEditorData = function () {
        this.editor = {};
    };
    /**
     * Sets editor data from current item data, fetched from backend
     */
    FeatureData.prototype.copyReadToEditor = function () {
        this.isLoading = true;
        this.editor = Object.assign(this.editor, this.read);
        this.isLoading = false;
    };
    FeatureData.prototype.clearErrors = function () {
        this.errors = {};
    };
    FeatureData.prototype.clearError = function (field) {
        var _a;
        this.errors = __assign(__assign({}, this.errors), (_a = {}, _a[field] = undefined, _a));
    };
    Object.defineProperty(FeatureData.prototype, "editorDataForCurrentMode", {
        /**
         * Data fields, only for current mode (update/create), based on field and feature
         * roles and permissions
         */
        get: function () {
            var fields = this.feature.fieldsOfCurrentMode.map(function (field) { return field.name; });
            return pickBy(function (_, k) { return fields.includes(k); }, this.editor);
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable
    ], FeatureData.prototype, "references", void 0);
    __decorate([
        observable
    ], FeatureData.prototype, "isLoading", void 0);
    __decorate([
        observable
    ], FeatureData.prototype, "list", void 0);
    __decorate([
        observable
    ], FeatureData.prototype, "read", void 0);
    __decorate([
        observable
    ], FeatureData.prototype, "editor", void 0);
    __decorate([
        observable
    ], FeatureData.prototype, "errors", void 0);
    __decorate([
        action
    ], FeatureData.prototype, "createReferenceData", null);
    __decorate([
        action
    ], FeatureData.prototype, "clearReadData", null);
    __decorate([
        action
    ], FeatureData.prototype, "clearEditorData", null);
    __decorate([
        action
    ], FeatureData.prototype, "copyReadToEditor", null);
    __decorate([
        action
    ], FeatureData.prototype, "clearErrors", null);
    __decorate([
        action
    ], FeatureData.prototype, "clearError", null);
    __decorate([
        computed
    ], FeatureData.prototype, "editorDataForCurrentMode", null);
    return FeatureData;
}());
export { FeatureData };
