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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React from 'react';
import { ENTITY_ERRORS, ENTITY_SORT_DIRS, ENTITY_REFERENCE_FIELDS, } from '../../types/entity';
import { Page } from '../Page';
import { EntityList } from '../../components/EntityList';
import { EntityHead } from '../../components/EntityHead';
import { EntityFooter } from '../../components/EntityFooter';
import { computed, observable, action, reaction, flow, toJS } from 'mobx';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { EntityViewer } from '../../components/EntityViewer';
import { EntityBreadcrumbs } from '../../components/EntityBreadcrumbs';
import { Typography } from '@material-ui/core';
import { saveAs } from 'file-saver';
import { parseQuery } from '../../../utils/query';
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity(fields) {
        var _this = _super.call(this) || this;
        // Props
        _this.api = {
            list: { url: '/', method: 'get' },
        };
        _this.fields = [];
        _this.filters = [];
        _this.editable = false;
        _this.viewable = false;
        _this.creatable = false;
        _this.exportable = false;
        _this.selectable = false;
        _this.getItemsFn = undefined;
        _this.fetchItemsFn = undefined;
        _this.updateItemsFn = undefined;
        _this.createItemsFn = undefined;
        _this.references = {};
        _this.referenceData = {};
        _this.itemsPerPage = [5, 10, 15, 25, 50];
        _this.items = _this.itemsPerPage[_this.itemsPerPage.length] || 50;
        // Built-in
        _this.isLoading = true;
        _this.totalCount = 0;
        _this.page = 0;
        _this.data = [];
        _this.sortBy = '';
        _this.sortDir = ENTITY_SORT_DIRS.ASC;
        _this.editorFieldErrors = {};
        _this.editorData = {};
        _this.selected = [];
        _this.filterData = {};
        _this.setFilters = function (filters) {
            _this.filters = filters;
        };
        _this.setPage = function (page) {
            _this.page = page;
        };
        _this.setPerPage = function (items) {
            _this.items = items;
        };
        _this.setSelected = function (selected) {
            _this.selected = selected;
        };
        _this.setSort = function (field) {
            if (field !== _this.sortBy && _this.sortDir !== ENTITY_SORT_DIRS.DESC) {
                _this.sortDir = ENTITY_SORT_DIRS.DESC;
            }
            if (field === _this.sortBy) {
                _this.sortDir =
                    _this.sortDir === ENTITY_SORT_DIRS.ASC
                        ? ENTITY_SORT_DIRS.DESC
                        : ENTITY_SORT_DIRS.ASC;
            }
            _this.sortBy = field;
        };
        _this.getFilters = function () {
            return (_this.filters.length > 0 &&
                toJS(_this.filters).filter(function (el) { return el.name && el.value !== ''; })) ||
                [];
        };
        _this.applyFilter = function () {
            _this.page = 0;
            _this.fetchItems();
        };
        _this.fetchItems = function () {
            _this.fetchItemsCancel();
            _this.fetchItemsInstance = flow(function () {
                var filter, result, references, refResults, e_1;
                var _this = this;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            this.isLoading = true;
                            this.error = '';
                            this.selected = [];
                            _k.label = 1;
                        case 1:
                            _k.trys.push([1, 4, , 5]);
                            // loading entity
                            if (!((_b = (_a = this.api) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.url) || !this.fetchItemsFn) {
                                throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
                            }
                            filter = this.getFilters();
                            return [4 /*yield*/, (_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.auth) === null || _d === void 0 ? void 0 : _d.withToken(this.fetchItemsFn, {
                                    url: ((_f = (_e = this.api) === null || _e === void 0 ? void 0 : _e.list) === null || _f === void 0 ? void 0 : _f.url) || '',
                                    filter: filter,
                                    page: this.page,
                                    count: this.items,
                                    sortBy: this.sortBy,
                                    sortDir: this.sortDir,
                                })];
                        case 2:
                            result = _k.sent();
                            if (!result || result.error)
                                throw new Error((result === null || result === void 0 ? void 0 : result.error) || ENTITY_ERRORS.CANT_LOAD_ITEMS);
                            this.data = ((_g = result === null || result === void 0 ? void 0 : result.data) === null || _g === void 0 ? void 0 : _g.list) || [];
                            this.filterData = (result === null || result === void 0 ? void 0 : result.filterData) || {};
                            this.totalCount = ((_h = result === null || result === void 0 ? void 0 : result.data) === null || _h === void 0 ? void 0 : _h.totalCount) || 0;
                            references = this.fields
                                .filter(function (field) {
                                var _a;
                                return field.type &&
                                    Object.prototype.hasOwnProperty.call(ENTITY_REFERENCE_FIELDS, field.type) && ((_a = _this.references[field.name]) === null || _a === void 0 ? void 0 : _a.getMany);
                            })
                                .map(function (field) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = {};
                                            _a = field.name;
                                            return [4 /*yield*/, this.references[field.name].getMany(this)];
                                        case 1: return [2 /*return*/, (_b[_a] = _c.sent(),
                                                _b)];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(references)];
                        case 3:
                            refResults = _k.sent();
                            this.referenceData = refResults.reduce(function (obj, res) { return (__assign(__assign({}, obj), res)); }, {});
                            // updating field reference data
                            this.fields = this.fields.map(function (field) {
                                return _this.referenceData[field.name]
                                    ? __assign(__assign({}, field), { options: { referenceData: _this.referenceData[field.name] } }) : field;
                            });
                            // finished
                            this.isLoading = false;
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _k.sent();
                            (_j = this.parent) === null || _j === void 0 ? void 0 : _j.notifications.showError(e_1.message);
                            this.isLoading = false;
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }).bind(_this)();
        };
        _this.fetchItemsCancel = function () {
            try {
                if (_this.fetchItemsInstance && _this.fetchItemsInstance.cancel) {
                    _this.fetchItemsInstance.cancel();
                }
            }
            catch (e) { }
        };
        _this.updateItem = function () {
            _this.updateItemInstance = flow(function () {
                var data, result, e_2;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                return __generator(this, function (_q) {
                    switch (_q.label) {
                        case 0:
                            this.isLoading = true;
                            this.error = '';
                            _q.label = 1;
                        case 1:
                            _q.trys.push([1, 3, , 4]);
                            data = toJS(this.editorData);
                            if (!this.validateSubmitFields(data, false)) {
                                throw new Error(ENTITY_ERRORS.INCORRECT_INPUT);
                            }
                            if (!((_b = (_a = this.api) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.url) || !this.updateItemsFn) {
                                throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
                            }
                            return [4 /*yield*/, (_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.auth) === null || _d === void 0 ? void 0 : _d.withToken(this.updateItemsFn, {
                                    url: ((_f = (_e = this.api) === null || _e === void 0 ? void 0 : _e.update) === null || _f === void 0 ? void 0 : _f.url) || '',
                                    data: data,
                                })];
                        case 2:
                            result = _q.sent();
                            if (!result || result.error)
                                throw new Error((result === null || result === void 0 ? void 0 : result.error) || ENTITY_ERRORS.CANT_LOAD_ITEMS);
                            this.fetchItems();
                            if (((_h = (_g = this.parent) === null || _g === void 0 ? void 0 : _g.history) === null || _h === void 0 ? void 0 : _h.length) && ((_j = this.parent) === null || _j === void 0 ? void 0 : _j.history.goBack)) {
                                (_k = this.parent) === null || _k === void 0 ? void 0 : _k.history.goBack();
                            }
                            else if ((_m = (_l = this.parent) === null || _l === void 0 ? void 0 : _l.history) === null || _m === void 0 ? void 0 : _m.push) {
                                (_o = this.parent) === null || _o === void 0 ? void 0 : _o.history.push(this.menu.url);
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            e_2 = _q.sent();
                            (_p = this.parent) === null || _p === void 0 ? void 0 : _p.notifications.showError(e_2.message);
                            this.isLoading = false;
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }).bind(_this)();
        };
        _this.onEditCancel = function () {
            var _a, _b, _c, _d, _e, _f, _g;
            if (((_b = (_a = _this.parent) === null || _a === void 0 ? void 0 : _a.history) === null || _b === void 0 ? void 0 : _b.length) && ((_c = _this.parent) === null || _c === void 0 ? void 0 : _c.history.goBack)) {
                (_d = _this.parent) === null || _d === void 0 ? void 0 : _d.history.goBack();
            }
            else if ((_f = (_e = _this.parent) === null || _e === void 0 ? void 0 : _e.history) === null || _f === void 0 ? void 0 : _f.push) {
                (_g = _this.parent) === null || _g === void 0 ? void 0 : _g.history.push(_this.menu.url);
            }
        };
        _this.createItem = function () {
            _this.updateItemInstance = flow(function () {
                var data, result, e_3;
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            this.isLoading = true;
                            this.error = '';
                            _j.label = 1;
                        case 1:
                            _j.trys.push([1, 3, , 4]);
                            data = toJS(this.editorData);
                            if (!this.validateSubmitFields(data, true)) {
                                throw new Error(ENTITY_ERRORS.INCORRECT_INPUT);
                            }
                            if (!((_b = (_a = this.api) === null || _a === void 0 ? void 0 : _a.create) === null || _b === void 0 ? void 0 : _b.url) || !this.createItemsFn) {
                                throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
                            }
                            return [4 /*yield*/, (_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.auth) === null || _d === void 0 ? void 0 : _d.withToken(this.createItemsFn, {
                                    url: ((_f = (_e = this.api) === null || _e === void 0 ? void 0 : _e.create) === null || _f === void 0 ? void 0 : _f.url) || '',
                                    data: data,
                                })];
                        case 2:
                            result = _j.sent();
                            if (!result || result.error)
                                throw new Error((result === null || result === void 0 ? void 0 : result.error) || ENTITY_ERRORS.CANT_LOAD_ITEMS);
                            this.fetchItems();
                            (_g = this.parent) === null || _g === void 0 ? void 0 : _g.history.push(this.menu.url);
                            return [3 /*break*/, 4];
                        case 3:
                            e_3 = _j.sent();
                            this.error = e_3;
                            (_h = this.parent) === null || _h === void 0 ? void 0 : _h.notifications.showError(e_3.message);
                            this.isLoading = false;
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }).bind(_this)();
        };
        _this.resetFieldError = function (field) {
            delete _this.editorFieldErrors[field];
        };
        _this.isValidField = function (field, value) {
            return (!field.required || field.type === 'boolean' || !!value) &&
                (!field.validator || !field.validator(value));
        };
        _this.validateSubmitFields = function (data, isCreating) {
            if (isCreating === void 0) { isCreating = false; }
            _this.editorFieldErrors = _this.fields
                .filter(function (field) {
                return (isCreating && !field.hideInCreate) ||
                    (!isCreating && !field.hideInEdit);
            })
                .reduce(function (obj, field) {
                var _a;
                return _this.isValidField(field, data[field.name])
                    ? obj
                    : __assign(__assign({}, obj), (_a = {}, _a[field.name] = (field.validator && field.validator(data[field.name])) ||
                        ENTITY_ERRORS.FIELD_IS_REQUIRED, _a));
            }, {});
            return Object.keys(_this.editorFieldErrors).length === 0;
        };
        _this.getItem = function (id) {
            _this.getItemsInstance = flow(function () {
                var result, e_4;
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            this.isLoading = true;
                            this.error = '';
                            if (Object.keys(this.editorFieldErrors).length) {
                                this.editorFieldErrors = {};
                            }
                            _j.label = 1;
                        case 1:
                            _j.trys.push([1, 3, , 4]);
                            if (!((_b = (_a = this.api) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.url) || !this.getItemsFn) {
                                throw new Error(ENTITY_ERRORS.CANT_LOAD_ITEMS);
                            }
                            return [4 /*yield*/, (_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.auth) === null || _d === void 0 ? void 0 : _d.withToken(this.getItemsFn, {
                                    id: id,
                                    url: (_f = (_e = this.api) === null || _e === void 0 ? void 0 : _e.get) === null || _f === void 0 ? void 0 : _f.url,
                                })];
                        case 2:
                            result = _j.sent();
                            if (!result || result.error)
                                throw new Error((result === null || result === void 0 ? void 0 : result.error) || ENTITY_ERRORS.CANT_LOAD_ITEMS);
                            this.editorData = result.data;
                            this.isLoading = false;
                            return [3 /*break*/, 4];
                        case 3:
                            e_4 = _j.sent();
                            (_g = this.parent) === null || _g === void 0 ? void 0 : _g.notifications.showError(e_4.message);
                            (_h = this.parent) === null || _h === void 0 ? void 0 : _h.history.push(this.menu.url);
                            this.isLoading = false;
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }).bind(_this)();
        };
        _this.getItemsCancel = function () {
            try {
                if (_this.getItemsInstance && _this.getItemsInstance.cancel) {
                    _this.getItemsInstance.cancel();
                }
            }
            catch (e) { }
        };
        _this.setEditorData = function (data) {
            _this.editorData = data;
        };
        _this.createEmptyItem = function () {
            _this.editorData = {};
        };
        _this.onMount = function () {
            _this.getFiltersFromHash();
            reaction(function () { return [_this.filters, _this.sortBy, _this.sortDir, _this.page]; }, _this.setFiltersWindowHash);
            reaction(function () { return [_this.items, _this.sortBy, _this.sortDir]; }, _this.applyFilter);
            reaction(function () { return _this.page; }, _this.fetchItems);
            _this.fetchItems();
        };
        _this.onUnmount = function () {
            _this.fetchItemsCancel();
        };
        _this.exportData = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, fields, rows, csv, uri;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!this.fetchItemsFn)
                            return [2 /*return*/];
                        return [4 /*yield*/, ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.withToken(this.fetchItemsFn, {
                                url: (_d = (_c = this.api) === null || _c === void 0 ? void 0 : _c.list) === null || _d === void 0 ? void 0 : _d.url,
                                filter: this.getFilters(),
                                page: 0,
                                count: 1000,
                                sortDir: 'DESC',
                                sortBy: 'id',
                            }))];
                    case 1:
                        response = _f.sent();
                        if (!((_e = response.data) === null || _e === void 0 ? void 0 : _e.list))
                            return [2 /*return*/];
                        fields = this.fields
                            .filter(function (field) { return !field.hideInExport; })
                            .map(function (field) { return field.name; });
                        rows = __spreadArrays([
                            fields
                        ], response.data.list.map(function (item) {
                            return fields.reduce(function (obj, field) { return __spreadArrays(obj, ['"' + String(item[field]) + '"']); }, []);
                        }));
                        csv = 'data:text/csv;charset=utf-8,' + rows.map(function (e) { return e.join(','); }).join('\n');
                        uri = encodeURI(csv);
                        saveAs(uri, this.title + ".csv");
                        return [2 /*return*/];
                }
            });
        }); };
        _this.setFiltersWindowHash = function () {
            var filters = _this.getFilters().reduce(function (obj, filter) {
                var _a;
                return (__assign(__assign({}, obj), (_a = {}, _a[filter.name] = filter.value, _a)));
            }, {});
            var params = new URLSearchParams(__assign(__assign({}, filters), { _page: _this.page.toString(), _sortBy: _this.sortBy.toString(), _sortDir: _this.sortDir.toString() }));
            window.location.hash = params.toString();
        };
        _this.getFiltersFromHash = function () {
            var hash = window.location.hash.slice(1, window.location.hash.length);
            var query = parseQuery(hash);
            var filters = _this.fields
                .filter(function (field) { return field.filterable && Object.keys(query).includes(field.name); })
                .map(function (field) { return ({ value: query[field.name], name: field.name }); });
            _this.setFilters(filters);
            if (query._page && parseInt(query._page)) {
                _this.page = parseInt(query._page);
            }
            if (query._sortDir && ['asc', 'desc'].includes(query._sortDir)) {
                _this.sortDir = query._sortDir === 'asc' ? 'asc' : 'desc';
            }
            if (query._sortBy &&
                _this.fields.some(function (field) { return field.name === query._sortBy; })) {
                _this.sortBy = query._sortBy;
            }
        };
        if (fields) {
            Object.assign(_this, fields);
        }
        return _this;
    }
    Object.defineProperty(Entity.prototype, "canEdit", {
        get: function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            return !!(!this.roles ||
                (((_c = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.role) &&
                    (((_e = (_d = this.roles) === null || _d === void 0 ? void 0 : _d.all) === null || _e === void 0 ? void 0 : _e.includes((_g = (_f = this.parent.auth) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? void 0 : _g.role.toString())) || ((_j = (_h = this.roles) === null || _h === void 0 ? void 0 : _h.update) === null || _j === void 0 ? void 0 : _j.includes((_l = (_k = this.parent.auth) === null || _k === void 0 ? void 0 : _k.user) === null || _l === void 0 ? void 0 : _l.role.toString())))));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "canCreate", {
        get: function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            return !!(!this.roles ||
                (((_c = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.role) &&
                    (((_e = (_d = this.roles) === null || _d === void 0 ? void 0 : _d.all) === null || _e === void 0 ? void 0 : _e.includes((_g = (_f = this.parent.auth) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? void 0 : _g.role.toString())) || ((_j = (_h = this.roles) === null || _h === void 0 ? void 0 : _h.create) === null || _j === void 0 ? void 0 : _j.includes((_l = (_k = this.parent.auth) === null || _k === void 0 ? void 0 : _k.user) === null || _l === void 0 ? void 0 : _l.role.toString())))));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "ListHeadTitle", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement(Typography, { variant: "h4", style: { flex: 1 } }, _this.title)); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "ListHeadButtons", {
        get: function () {
            return observer(function () { return React.createElement(React.Fragment, null); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "ListHead", {
        get: function () {
            var _this = this;
            return observer(function () {
                var _a, _b;
                return (React.createElement(EntityHead, { filterData: _this.filterData, title: React.createElement(_this.ListHeadTitle, null), buttons: React.createElement(_this.ListHeadButtons, null), filters: _this.filters, fields: _this.fields, setFilters: _this.setFilters, url: _this.menu.url, applyFilter: _this.applyFilter, withToken: (_b = (_a = _this.parent) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.withToken, onExport: _this.exportData, canExport: _this.exportable, canCreate: _this.creatable && _this.canCreate, entity: _this }));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "ListExtra", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "ListBody", {
        get: function () {
            var _this = this;
            return observer(function () {
                var _a, _b;
                return (React.createElement(EntityList, { fields: _this.fields, data: _this.data, extra: _this.ListExtra, isLoading: _this.isLoading, url: _this.menu.url, selected: _this.selected, sortBy: _this.sortBy, sortDir: _this.sortDir, canView: _this.viewable, canEdit: _this.editable && _this.canEdit, canSelect: _this.selectable, setSelected: _this.setSelected, onSortChange: _this.setSort, withToken: (_b = (_a = _this.parent) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.withToken, entity: _this }));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "ListFooter", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement(EntityFooter, { page: _this.page, itemsPerPage: _this.itemsPerPage, items: _this.items, totalCount: _this.totalCount, setPage: _this.setPage, setPerPage: _this.setPerPage })); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "List", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement("div", null,
                React.createElement(_this.ListHead, null),
                React.createElement(_this.ListBody, null),
                React.createElement(_this.ListFooter, null))); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Breadcrumbs", {
        get: function () {
            var _this = this;
            return observer(function (_a) {
                var id = _a.id, _b = _a.isEditing, isEditing = _b === void 0 ? false : _b, _c = _a.isCreating, isCreating = _c === void 0 ? false : _c, buttons = _a.buttons;
                return (React.createElement(EntityBreadcrumbs, { data: _this.editorData, fields: _this.fields, id: id, name: _this.title, url: _this.menu.url, viewable: _this.viewable, isEditing: isEditing, isCreating: isCreating, buttons: buttons }));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "ViewerHeadButtons", {
        get: function () {
            return observer(function (_a) {
                var id = _a.id;
                return null;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "ViewerHead", {
        get: function () {
            var _this = this;
            return observer(function (_a) {
                var id = _a.id;
                return (React.createElement(_this.Breadcrumbs, { id: id, buttons: React.createElement(_this.ViewerHeadButtons, { id: id }) }));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "ViewerFooter", {
        get: function () {
            return observer(function (_a) {
                var id = _a.id;
                return null;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "ViewerBody", {
        get: function () {
            var _this = this;
            return observer(function (_a) {
                var id = _a.id;
                var _b, _c;
                return (React.createElement(EntityViewer, { id: id, fields: _this.fields, url: _this.menu.url, errors: _this.editorFieldErrors, onSave: function () { }, onCancel: _this.onEditCancel, onResetFieldError: _this.resetFieldError, isEditing: false, isLoading: _this.isLoading, setEditorData: _this.setEditorData, data: _this.editorData, getItem: _this.getItem, cancelGetItem: _this.getItemsCancel, withToken: (_c = (_b = _this.parent) === null || _b === void 0 ? void 0 : _b.auth) === null || _c === void 0 ? void 0 : _c.withToken, viewable: _this.viewable, entity: _this }));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Viewer", {
        get: function () {
            var _this = this;
            return observer(function (_a) {
                var id = _a.id;
                return (React.createElement(React.Fragment, null,
                    React.createElement(_this.ViewerHead, { id: id }),
                    React.createElement(_this.ViewerBody, { id: id }),
                    React.createElement(_this.ViewerFooter, { id: id })));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "EditorHeadButtons", {
        get: function () {
            return observer(function (_a) {
                var id = _a.id;
                return null;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "EditorHead", {
        get: function () {
            var _this = this;
            return observer(function (_a) {
                var id = _a.id;
                return (React.createElement(_this.Breadcrumbs, { id: id, buttons: React.createElement(_this.EditorHeadButtons, { id: id }), isEditing: true }));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "EditorFooter", {
        get: function () {
            return observer(function (_a) {
                var id = _a.id;
                return null;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "EditorBody", {
        get: function () {
            var _this = this;
            return observer(function (_a) {
                var id = _a.id;
                var _b, _c;
                return (React.createElement(EntityViewer, { id: id, fields: _this.fields, errors: _this.editorFieldErrors, url: _this.menu.url, onSave: _this.updateItem, onCancel: _this.onEditCancel, onResetFieldError: _this.resetFieldError, isLoading: _this.isLoading, setEditorData: _this.setEditorData, data: _this.editorData, getItem: _this.getItem, cancelGetItem: _this.getItemsCancel, withToken: (_c = (_b = _this.parent) === null || _b === void 0 ? void 0 : _b.auth) === null || _c === void 0 ? void 0 : _c.withToken, viewable: _this.viewable, entity: _this, isEditing: true }));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Editor", {
        get: function () {
            var _this = this;
            return observer(function (_a) {
                var id = _a.id;
                return (React.createElement(React.Fragment, null,
                    React.createElement(_this.EditorHead, { id: id }),
                    React.createElement(_this.EditorBody, { id: id }),
                    React.createElement(_this.EditorFooter, { id: id })));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "CreatorHeadButtons", {
        get: function () {
            return observer(function () { return null; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "CreatorHead", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement(_this.Breadcrumbs, { buttons: React.createElement(_this.CreatorHeadButtons, null), isCreating: true })); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "CreatorFooter", {
        get: function () {
            return observer(function () { return null; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "CreatorBody", {
        get: function () {
            var _this = this;
            return observer(function () {
                var _a, _b;
                return (React.createElement(EntityViewer, { fields: _this.fields, errors: _this.editorFieldErrors, url: _this.menu.url, onSave: _this.createItem, onCancel: _this.onEditCancel, onResetFieldError: _this.resetFieldError, isEditing: true, isLoading: _this.isLoading, setEditorData: _this.setEditorData, data: _this.editorData, getItem: _this.createEmptyItem, cancelGetItem: _this.getItemsCancel, viewable: _this.viewable, withToken: (_b = (_a = _this.parent) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.withToken, entity: _this }));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Creator", {
        get: function () {
            var _this = this;
            return observer(function (_a) {
                var id = _a.id;
                return (React.createElement(React.Fragment, null,
                    React.createElement(_this.CreatorHead, null),
                    React.createElement(_this.CreatorBody, null),
                    React.createElement(_this.CreatorFooter, null)));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "output", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement(Switch, null,
                React.createElement(Route, { path: _this.menu.url + "/create", component: _this.Creator }),
                React.createElement(Route, { path: _this.menu.url + "/:id/edit", component: function (_a) {
                        var id = _a.match.params.id;
                        return React.createElement(_this.Editor, { id: id });
                    } }),
                React.createElement(Route, { path: _this.menu.url + "/:id/", component: function (_a) {
                        var id = _a.match.params.id;
                        return React.createElement(_this.Viewer, { id: id });
                    } }),
                React.createElement(Route, { path: _this.menu.url, component: _this.List }))); });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        observable
    ], Entity.prototype, "api", void 0);
    __decorate([
        observable
    ], Entity.prototype, "fields", void 0);
    __decorate([
        observable
    ], Entity.prototype, "filters", void 0);
    __decorate([
        observable
    ], Entity.prototype, "editable", void 0);
    __decorate([
        observable
    ], Entity.prototype, "viewable", void 0);
    __decorate([
        observable
    ], Entity.prototype, "creatable", void 0);
    __decorate([
        observable
    ], Entity.prototype, "exportable", void 0);
    __decorate([
        observable
    ], Entity.prototype, "selectable", void 0);
    __decorate([
        observable
    ], Entity.prototype, "getItemsFn", void 0);
    __decorate([
        observable
    ], Entity.prototype, "fetchItemsFn", void 0);
    __decorate([
        observable
    ], Entity.prototype, "updateItemsFn", void 0);
    __decorate([
        observable
    ], Entity.prototype, "createItemsFn", void 0);
    __decorate([
        observable
    ], Entity.prototype, "references", void 0);
    __decorate([
        observable
    ], Entity.prototype, "referenceData", void 0);
    __decorate([
        observable
    ], Entity.prototype, "itemsPerPage", void 0);
    __decorate([
        observable
    ], Entity.prototype, "items", void 0);
    __decorate([
        observable
    ], Entity.prototype, "isLoading", void 0);
    __decorate([
        observable
    ], Entity.prototype, "totalCount", void 0);
    __decorate([
        observable
    ], Entity.prototype, "page", void 0);
    __decorate([
        observable
    ], Entity.prototype, "data", void 0);
    __decorate([
        observable
    ], Entity.prototype, "error", void 0);
    __decorate([
        observable
    ], Entity.prototype, "sortBy", void 0);
    __decorate([
        observable
    ], Entity.prototype, "sortDir", void 0);
    __decorate([
        observable
    ], Entity.prototype, "editorFieldErrors", void 0);
    __decorate([
        observable
    ], Entity.prototype, "editorData", void 0);
    __decorate([
        observable
    ], Entity.prototype, "selected", void 0);
    __decorate([
        observable
    ], Entity.prototype, "filterData", void 0);
    __decorate([
        action
    ], Entity.prototype, "setFilters", void 0);
    __decorate([
        action
    ], Entity.prototype, "setPage", void 0);
    __decorate([
        action
    ], Entity.prototype, "setPerPage", void 0);
    __decorate([
        action
    ], Entity.prototype, "setSelected", void 0);
    __decorate([
        action
    ], Entity.prototype, "setSort", void 0);
    __decorate([
        action
    ], Entity.prototype, "fetchItems", void 0);
    __decorate([
        action
    ], Entity.prototype, "updateItem", void 0);
    __decorate([
        action
    ], Entity.prototype, "onEditCancel", void 0);
    __decorate([
        action
    ], Entity.prototype, "createItem", void 0);
    __decorate([
        action
    ], Entity.prototype, "resetFieldError", void 0);
    __decorate([
        action
    ], Entity.prototype, "validateSubmitFields", void 0);
    __decorate([
        observable
    ], Entity.prototype, "getItemsInstance", void 0);
    __decorate([
        action
    ], Entity.prototype, "getItem", void 0);
    __decorate([
        action
    ], Entity.prototype, "setEditorData", void 0);
    __decorate([
        action
    ], Entity.prototype, "createEmptyItem", void 0);
    __decorate([
        computed
    ], Entity.prototype, "canEdit", null);
    __decorate([
        computed
    ], Entity.prototype, "canCreate", null);
    __decorate([
        action
    ], Entity.prototype, "onMount", void 0);
    __decorate([
        action
    ], Entity.prototype, "onUnmount", void 0);
    __decorate([
        observable
    ], Entity.prototype, "exportData", void 0);
    __decorate([
        computed
    ], Entity.prototype, "ListHeadTitle", null);
    __decorate([
        computed
    ], Entity.prototype, "ListHeadButtons", null);
    __decorate([
        computed
    ], Entity.prototype, "ListHead", null);
    __decorate([
        computed
    ], Entity.prototype, "ListExtra", null);
    __decorate([
        computed
    ], Entity.prototype, "ListBody", null);
    __decorate([
        computed
    ], Entity.prototype, "ListFooter", null);
    __decorate([
        computed
    ], Entity.prototype, "List", null);
    __decorate([
        computed
    ], Entity.prototype, "Breadcrumbs", null);
    __decorate([
        computed
    ], Entity.prototype, "ViewerHeadButtons", null);
    __decorate([
        computed
    ], Entity.prototype, "ViewerHead", null);
    __decorate([
        computed
    ], Entity.prototype, "ViewerFooter", null);
    __decorate([
        computed
    ], Entity.prototype, "ViewerBody", null);
    __decorate([
        computed
    ], Entity.prototype, "Viewer", null);
    __decorate([
        computed
    ], Entity.prototype, "EditorHeadButtons", null);
    __decorate([
        computed
    ], Entity.prototype, "EditorHead", null);
    __decorate([
        computed
    ], Entity.prototype, "EditorFooter", null);
    __decorate([
        computed
    ], Entity.prototype, "EditorBody", null);
    __decorate([
        computed
    ], Entity.prototype, "Editor", null);
    __decorate([
        computed
    ], Entity.prototype, "CreatorHeadButtons", null);
    __decorate([
        computed
    ], Entity.prototype, "CreatorHead", null);
    __decorate([
        computed
    ], Entity.prototype, "CreatorFooter", null);
    __decorate([
        computed
    ], Entity.prototype, "CreatorBody", null);
    __decorate([
        computed
    ], Entity.prototype, "Creator", null);
    __decorate([
        computed
    ], Entity.prototype, "output", null);
    __decorate([
        action
    ], Entity.prototype, "setFiltersWindowHash", void 0);
    __decorate([
        action
    ], Entity.prototype, "getFiltersFromHash", void 0);
    return Entity;
}(Page));
export { Entity };
