/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import React from 'react';
import { Page } from '../Page';
import { action, computed, extendObservable, observable, reaction } from 'mobx';
import { FeatureApi } from './items/FeatureApi';
import { FeatureRenderer } from './items/FeatureRenderer';
import { FeatureFeature, FeatureMode, } from './types';
import { Provider } from 'mobx-react';
import { FEATURE_DEFAULT_FEATURES } from './defaults';
import { FeatureData } from './items/FeatureData';
import { FeatureController } from './items/FeatureController';
import { FeatureFilters } from './items/FeatureFilters';
import { debounce } from 'throttle-debounce';
import { has } from 'ramda';
var Feature = /** @class */ (function (_super) {
    __extends(Feature, _super);
    function Feature(title, url, options) {
        if (options === void 0) { options = {}; }
        var _a, _b;
        var _this = _super.call(this, {
            title: title,
            roles: options === null || options === void 0 ? void 0 : options.roles,
            menu: {
                enabled: ((_a = options === null || options === void 0 ? void 0 : options.menu) === null || _a === void 0 ? void 0 : _a.enabled) || true,
                label: ((_b = options === null || options === void 0 ? void 0 : options.menu) === null || _b === void 0 ? void 0 : _b.label) || title,
                url: url,
            },
        }) || this;
        _this.title = title;
        _this.url = url;
        _this.options = {};
        _this.features = FEATURE_DEFAULT_FEATURES;
        _this.renderer = new FeatureRenderer();
        _this.data = new FeatureData(_this);
        _this.filters = new FeatureFilters(_this);
        _this.controller = new FeatureController(_this);
        _this.api = new FeatureApi(_this);
        /**
         * Array of fields, coming from props
         */
        _this.fieldsList = [];
        /**
         * Custom function, that returns single item's id, can be overriden by
         * Feature's props
         * TODO: use it everywhere (currently not using)
         */
        _this.getItemId = function (fields) { return fields.id; };
        /**
         * Custom function, that returns single item's title, can be overriden by
         * Feature's props
         */
        _this.getItemTitle = function () { return ''; };
        /**
         * Redirects to list of items
         */
        _this.goToList = function () {
            var _a;
            (_a = _this.history) === null || _a === void 0 ? void 0 : _a.push(_this.filters.queryString);
        };
        /**
         * Redirects to specific item
         */
        _this.goToRead = function (id) {
            var _a;
            (_a = _this.history) === null || _a === void 0 ? void 0 : _a.push(_this.url + "/" + id + "/");
        };
        /**
         * Redirects to specific item editor
         */
        _this.goToUpdate = function (id) {
            var _a;
            (_a = _this.history) === null || _a === void 0 ? void 0 : _a.push(_this.url + "/" + id + "/" + FeatureMode.update + "/");
        };
        /**
         * Redirects to specific item editor
         */
        _this.goToCreate = function () {
            var _a;
            (_a = _this.history) === null || _a === void 0 ? void 0 : _a.push(_this.url + "/" + FeatureMode.create);
        };
        /**
         * Clears data on editing cancel
         */
        _this.cancelEditing = function () {
            var _a;
            switch (_this.mode) {
                case FeatureMode.create:
                    _this.goToList();
                    break;
                case FeatureMode.update:
                    var id = _this.controller.getIdFromUrl();
                    _this.goToRead(id);
                    break;
                default:
                    (_a = _this.history) === null || _a === void 0 ? void 0 : _a.goBack();
            }
            _this.data.clearEditorData();
        };
        /**
         * Called when page, count, sort or filter changed.
         */
        _this.onFilterChange = function () {
            _this.filters.persistFilters();
            _this.controller.beforeListMode();
        };
        extendObservable(_this, { title: title, url: url, options: options });
        if (options)
            _this.options = options;
        if (options.fields)
            _this.fieldsList = options.fields;
        if (options.features)
            _this.features = options.features;
        if (options.rows)
            _this.filters.rows = options.rows;
        if (options.getItemTitle)
            _this.getItemTitle = options.getItemTitle;
        if (options.permissions)
            _this.permissions = options.permissions;
        // Initialize renderer
        _this.renderer =
            options.renderer ||
                new FeatureRenderer({
                    containers: options === null || options === void 0 ? void 0 : options.containers,
                    components: options === null || options === void 0 ? void 0 : options.components,
                });
        // Initialize ref fields storage
        _this.data.createReferenceData(_this.api.references);
        // Get filters from url
        _this.filters.restoreFilters();
        // Update withToken for api
        _this.api.useFeature(_this);
        // Pass current feature to fields
        _this.attachFeatureToFields();
        // React on changes of mode
        reaction(function () { return _this.mode; }, _this.controller.onActionChange);
        // React on changes of list props
        reaction(function () { return [
            _this.filters.sortBy,
            _this.filters.sortDir,
            _this.filters.page,
            _this.filters.rows,
        ]; }, debounce(200, _this.onFilterChange));
        reaction(function () { return [_this.filters.value]; }, debounce(400, _this.onFilterChange));
        return _this;
    }
    /**
     * Sets this feature in each field
     */
    Feature.prototype.attachFeatureToFields = function () {
        var _this = this;
        this.fieldsList.forEach(function (field) { return field.useFeature(_this); });
    };
    Object.defineProperty(Feature.prototype, "isEditing", {
        get: function () {
            return this.mode === FeatureMode.create || this.mode === FeatureMode.update;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Feature.prototype, "fields", {
        /**
         * Record<name, field> of fields
         */
        get: function () {
            return this.fieldsList.reduce(function (acc, field) {
                var _a;
                return (__assign(__assign({}, acc), (_a = {}, _a[field.name] = field, _a)));
            }, {});
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Feature.prototype, "fieldsOfCurrentMode", {
        /**
         * Returns only fields, that should be displayed / validated on current mode
         */
        get: function () {
            var _this = this;
            return this.fieldsList.filter(function (field) { return _this.mode && field.featuresOfCurrentUser[_this.mode]; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Feature.prototype, "output", {
        /**
         * Main renderer
         */
        get: function () {
            var _this = this;
            return function () { return React.createElement(Provider, { feature: _this }, _this.renderer.output); };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Feature.prototype, "history", {
        /**
         * Proper react-router history
         */
        get: function () {
            var _a;
            return (_a = this.parent) === null || _a === void 0 ? void 0 : _a.history;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Feature.prototype, "availableFeatures", {
        /**
         * Features, available for current user
         */
        get: function () {
            var _this = this;
            var _a;
            var auth = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.auth;
            var role = auth === null || auth === void 0 ? void 0 : auth.userRole;
            return Object.values(FeatureFeature).reduce(function (acc, feature) {
                var _a;
                var byRole = !_this.roles || (role && _this.roles.includes(role));
                var byPermission = !_this.permissions ||
                    !has(feature, _this.permissions) ||
                    (role && _this.permissions[feature].includes(role));
                return __assign(__assign({}, acc), (_a = {}, _a[feature] = byRole && byPermission, _a));
            }, {});
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable
    ], Feature.prototype, "permissions", void 0);
    __decorate([
        observable
    ], Feature.prototype, "options", void 0);
    __decorate([
        observable
    ], Feature.prototype, "features", void 0);
    __decorate([
        observable
    ], Feature.prototype, "renderer", void 0);
    __decorate([
        observable
    ], Feature.prototype, "data", void 0);
    __decorate([
        observable
    ], Feature.prototype, "mode", void 0);
    __decorate([
        observable
    ], Feature.prototype, "filters", void 0);
    __decorate([
        observable
    ], Feature.prototype, "controller", void 0);
    __decorate([
        observable
    ], Feature.prototype, "api", void 0);
    __decorate([
        observable
    ], Feature.prototype, "fieldsList", void 0);
    __decorate([
        action
    ], Feature.prototype, "attachFeatureToFields", null);
    __decorate([
        computed
    ], Feature.prototype, "isEditing", null);
    __decorate([
        computed
    ], Feature.prototype, "fields", null);
    __decorate([
        computed
    ], Feature.prototype, "fieldsOfCurrentMode", null);
    __decorate([
        computed
    ], Feature.prototype, "output", null);
    __decorate([
        computed
    ], Feature.prototype, "history", null);
    __decorate([
        action
    ], Feature.prototype, "cancelEditing", void 0);
    __decorate([
        computed
    ], Feature.prototype, "availableFeatures", null);
    return Feature;
}(Page));
export { Feature };
