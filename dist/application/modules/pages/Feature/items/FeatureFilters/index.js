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
import { computed, observable } from 'mobx';
import React from 'react';
import { and, has, pickBy } from 'ramda';
import { FiltersRenderer } from '../../components/filters/FiltersRenderer';
import qs from 'query-string';
import { SortDir } from '../../types';
var FeatureFilters = /** @class */ (function () {
    function FeatureFilters(feature) {
        var _this = this;
        this.feature = feature;
        this.value = {};
        this.selected = [];
        this.count = 0;
        this.rows = 25;
        this.rowsSelectOptions = [10, 25, 50, 100, 200];
        this.page = 0;
        /**
         * Gets filters from url
         */
        this.restoreFilters = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var search = window.location.search;
            var fields = qs.parse(search);
            if (!fields)
                return;
            Object.keys(fields).forEach(function (field) {
                var _a;
                var _b, _c, _d, _e, _f, _g;
                if (!Object.prototype.hasOwnProperty.call(_this.fields, field) ||
                    !((_d = (_c = (_b = _this.fields[field]) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.features) === null || _d === void 0 ? void 0 : _d.filter) ||
                    !(_this.fields[field].allowEmptyFilter || ((_f = (_e = fields[field]) === null || _e === void 0 ? void 0 : _e.toString()) === null || _f === void 0 ? void 0 : _f.trim())))
                    return;
                _this.value = __assign(__assign({}, _this.value), (_a = {}, _a[field] = ((_g = fields[field]) === null || _g === void 0 ? void 0 : _g.toString()) || '', _a));
                _this.selected = __spreadArrays(_this.selected, [field]);
            });
            if (has('__sortDir', fields)) {
                switch ((_b = (_a = fields === null || fields === void 0 ? void 0 : fields.__sortDir) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.toLowerCase()) {
                    case SortDir.ASC:
                        _this.sortDir = SortDir.ASC;
                        break;
                    case SortDir.DESC:
                        _this.sortDir = SortDir.DESC;
                        break;
                    default:
                        _this.sortDir = undefined;
                }
            }
            if (and(has('__sortBy', fields), has(((_c = fields === null || fields === void 0 ? void 0 : fields.__sortBy) === null || _c === void 0 ? void 0 : _c.toString()) || '', _this.fields))) {
                _this.sortBy = ((_d = fields.__sortBy) === null || _d === void 0 ? void 0 : _d.toString()) || undefined;
            }
            if (and(has('__page', fields), parseInt(((_e = fields === null || fields === void 0 ? void 0 : fields.__page) === null || _e === void 0 ? void 0 : _e.toString()) || '', 10))) {
                _this.page = parseInt(((_f = fields === null || fields === void 0 ? void 0 : fields.__page) === null || _f === void 0 ? void 0 : _f.toString()) || '', 10);
            }
            if (and(has('__rows', fields), parseInt(((_g = fields === null || fields === void 0 ? void 0 : fields.__rows) === null || _g === void 0 ? void 0 : _g.toString()) || '', 10))) {
                _this.rows = parseInt(((_h = fields === null || fields === void 0 ? void 0 : fields.__rows) === null || _h === void 0 ? void 0 : _h.toString()) || '', 10);
            }
        };
        /**
         * Changes current url to has parseable filters
         */
        this.persistFilters = function () {
            var url = "" + window.location.origin + _this.queryString;
            window.history.replaceState('', '', url);
        };
    }
    Object.defineProperty(FeatureFilters.prototype, "fields", {
        get: function () {
            return pickBy(function (item) { var _a; return !!((_a = item.options.features) === null || _a === void 0 ? void 0 : _a.filter); })(this.feature.fields);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureFilters.prototype, "valuesForList", {
        get: function () {
            var _this = this;
            return pickBy(function (_, it) {
                return has(it, _this.fields) &&
                    (!!_this.value[it] || _this.fields[it].allowEmptyFilter);
            })(this.value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureFilters.prototype, "Filters", {
        get: function () {
            return React.createElement(FiltersRenderer, null);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureFilters.prototype, "queryString", {
        /**
         * Makes url for current set of filters for current feature
         */
        get: function () {
            var query = qs.stringify(__assign(__assign({}, this.value), { __sortDir: this.sortDir, __sortBy: this.sortBy, __rows: this.rows, __page: this.page }));
            return this.feature.url + "?" + query;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable
    ], FeatureFilters.prototype, "value", void 0);
    __decorate([
        observable
    ], FeatureFilters.prototype, "selected", void 0);
    __decorate([
        observable
    ], FeatureFilters.prototype, "count", void 0);
    __decorate([
        observable
    ], FeatureFilters.prototype, "rows", void 0);
    __decorate([
        observable
    ], FeatureFilters.prototype, "rowsSelectOptions", void 0);
    __decorate([
        observable
    ], FeatureFilters.prototype, "page", void 0);
    __decorate([
        observable
    ], FeatureFilters.prototype, "sortBy", void 0);
    __decorate([
        observable
    ], FeatureFilters.prototype, "sortDir", void 0);
    __decorate([
        computed
    ], FeatureFilters.prototype, "fields", null);
    __decorate([
        computed
    ], FeatureFilters.prototype, "valuesForList", null);
    __decorate([
        computed
    ], FeatureFilters.prototype, "Filters", null);
    __decorate([
        computed
    ], FeatureFilters.prototype, "queryString", null);
    return FeatureFilters;
}());
export { FeatureFilters };
