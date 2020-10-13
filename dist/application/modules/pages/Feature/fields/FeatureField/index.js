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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React from 'react';
import { action, computed, extendObservable, observable } from 'mobx';
import { FeatureFieldFeature, } from '../../types/field';
import { StringFilter } from '../../filters/StringFilter';
import { assocPath, dissocPath, has, lensPath, omit, view, } from 'ramda';
import { StringInput } from '../../components/inputs/StringInput';
import { observer } from 'mobx-react';
var FeatureField = /** @class */ (function () {
    function FeatureField(name, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.name = name;
        this.options = options;
        this.path = [];
        this.listColumnSize = '200px';
        this.allowEmptyFilter = false;
        this.features = {
            list: true,
            create: true,
            update: true,
            read: true,
            filter: false,
            sort: true,
        };
        this.onChange = function (val) {
            if (!_this.feature)
                return;
            _this.resetErrorIfAny();
            _this.feature.data.editor = assocPath(_this.fieldPath, val)(_this.feature.data.editor);
        };
        this.List = function (_a) {
            var value = _a.value;
            return React.createElement("div", null, value);
        };
        this.ListHead = function () { return React.createElement("div", null, _this.label); };
        this.Filter = observer(function (_a) {
            var inline = _a.inline;
            return (React.createElement(StringFilter, { value: _this.filterValue, name: _this.name, label: _this.label, onChange: _this.onFilterChange, onReset: _this.onFilterReset, inline: inline }));
        });
        this.onFilterChange = function (value) {
            var _a;
            if (!((_a = _this.feature) === null || _a === void 0 ? void 0 : _a.filters.value))
                return;
            _this.feature.filters.value = assocPath(_this.fieldPath, value)(_this.feature.filters.value);
        };
        this.onFilterReset = function () {
            var _a;
            if (!((_a = _this.feature) === null || _a === void 0 ? void 0 : _a.filters))
                return;
            _this.feature.filters.value = omit([_this.name], _this.feature.filters.value);
            _this.feature.filters.selected = dissocPath(_this.fieldPath, _this.feature.filters.selected);
        };
        extendObservable(this, { name: name, options: options });
        if (options.features) {
            this.features = __assign(__assign({}, this.features), options.features);
        }
        if (options.validator) {
            this.validator = options.validator;
        }
        if (options.allowEmptyFilter)
            this.allowEmptyFilter = options.allowEmptyFilter;
        if (options.roles)
            this.roles = options.roles;
        if (options.permissions)
            this.permissions = options.permissions;
        if (options.defaultValue)
            this.defaultValue = options.defaultValue;
        if (options.path)
            this.path = options.path;
    }
    Object.defineProperty(FeatureField.prototype, "label", {
        get: function () {
            return this.options.label || this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureField.prototype, "key", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    FeatureField.prototype.useFeature = function (feature) {
        this.feature = feature;
    };
    Object.defineProperty(FeatureField.prototype, "Read", {
        get: function () {
            return React.createElement(this.List, { value: this.readValue });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureField.prototype, "Update", {
        get: function () {
            var _a;
            var value = String(this.editValue);
            return (React.createElement(StringInput, { value: value, onChange: this.onChange, label: this.label, error: this.editError, isLoading: (_a = this.feature) === null || _a === void 0 ? void 0 : _a.data.isLoading }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureField.prototype, "Create", {
        get: function () {
            return this.Update;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureField.prototype, "filterValue", {
        get: function () {
            var _a;
            return view(lensPath(this.fieldPath), (_a = this.feature) === null || _a === void 0 ? void 0 : _a.filters.value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureField.prototype, "readValue", {
        get: function () {
            var _a;
            return view(lensPath(this.fieldPath), (_a = this.feature) === null || _a === void 0 ? void 0 : _a.data.read);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureField.prototype, "editValue", {
        get: function () {
            var _a;
            return view(lensPath(this.fieldPath), (_a = this.feature) === null || _a === void 0 ? void 0 : _a.data.editor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureField.prototype, "editError", {
        get: function () {
            var _a;
            return view(lensPath(this.fieldPath), (_a = this.feature) === null || _a === void 0 ? void 0 : _a.data.errors);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureField.prototype, "featuresOfCurrentUser", {
        /**
         * List of features, available for current user role by field.features,
         * field.roles and field.permissions
         */
        get: function () {
            var _this = this;
            var _a, _b;
            var auth = (_b = (_a = this.feature) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.auth;
            var role = auth === null || auth === void 0 ? void 0 : auth.userRole;
            return Object.values(FeatureFieldFeature).reduce(function (acc, feature) {
                var _a;
                var byFeature = _this.features[feature];
                var byRole = !_this.roles || (role && _this.roles.includes(role));
                var byPermission = !_this.permissions ||
                    !has(feature, _this.permissions) ||
                    (role && _this.permissions[feature].includes(role));
                return __assign(__assign({}, acc), (_a = {}, _a[feature] = byFeature && byRole && byPermission, _a));
            }, {});
        },
        enumerable: false,
        configurable: true
    });
    FeatureField.prototype.resetErrorIfAny = function () {
        if (this.feature && this.editError) {
            this.feature.data.errors = dissocPath(this.fieldPath, this.feature.data.errors);
        }
    };
    Object.defineProperty(FeatureField.prototype, "fieldPath", {
        get: function () {
            return __spreadArrays(this.path, [this.name]);
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable
    ], FeatureField.prototype, "path", void 0);
    __decorate([
        observable
    ], FeatureField.prototype, "feature", void 0);
    __decorate([
        observable
    ], FeatureField.prototype, "roles", void 0);
    __decorate([
        observable
    ], FeatureField.prototype, "permissions", void 0);
    __decorate([
        observable
    ], FeatureField.prototype, "listColumnSize", void 0);
    __decorate([
        observable
    ], FeatureField.prototype, "allowEmptyFilter", void 0);
    __decorate([
        observable
    ], FeatureField.prototype, "features", void 0);
    __decorate([
        observable
    ], FeatureField.prototype, "validator", void 0);
    __decorate([
        observable
    ], FeatureField.prototype, "defaultValue", void 0);
    __decorate([
        computed
    ], FeatureField.prototype, "label", null);
    __decorate([
        computed
    ], FeatureField.prototype, "key", null);
    __decorate([
        action
    ], FeatureField.prototype, "useFeature", null);
    __decorate([
        action
    ], FeatureField.prototype, "onChange", void 0);
    __decorate([
        observable
    ], FeatureField.prototype, "List", void 0);
    __decorate([
        observable
    ], FeatureField.prototype, "ListHead", void 0);
    __decorate([
        computed
    ], FeatureField.prototype, "Read", null);
    __decorate([
        computed
    ], FeatureField.prototype, "Update", null);
    __decorate([
        computed
    ], FeatureField.prototype, "Create", null);
    __decorate([
        observable
    ], FeatureField.prototype, "Filter", void 0);
    __decorate([
        action
    ], FeatureField.prototype, "onFilterChange", void 0);
    __decorate([
        action
    ], FeatureField.prototype, "onFilterReset", void 0);
    __decorate([
        computed
    ], FeatureField.prototype, "filterValue", null);
    __decorate([
        computed
    ], FeatureField.prototype, "readValue", null);
    __decorate([
        computed
    ], FeatureField.prototype, "editValue", null);
    __decorate([
        computed
    ], FeatureField.prototype, "editError", null);
    __decorate([
        computed
    ], FeatureField.prototype, "featuresOfCurrentUser", null);
    __decorate([
        action
    ], FeatureField.prototype, "resetErrorIfAny", null);
    __decorate([
        computed
    ], FeatureField.prototype, "fieldPath", null);
    return FeatureField;
}());
export { FeatureField };
