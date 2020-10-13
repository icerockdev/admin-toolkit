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
import { action, computed, toJS } from 'mobx';
import { UNAUTHORIZED } from '../../../../..';
import { has, keys } from 'ramda';
import { getReferenceAll } from './references';
import { FeatureFeature } from '../../types';
var FeatureApi = /** @class */ (function () {
    function FeatureApi(feature) {
        var _this = this;
        this.feature = feature;
        this.useFeature = function (feature) {
            _this.feature = feature;
        };
        this.list = function (feature) { return __awaiter(_this, void 0, void 0, function () {
            var _a, sortBy, sortDir, page, rows, valuesForList, url, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.availableApiFeatures.list) {
                            throw new Error('Specify feature api host, methods and urls first.');
                        }
                        _a = feature.filters, sortBy = _a.sortBy, sortDir = _a.sortDir, page = _a.page, rows = _a.rows, valuesForList = _a.valuesForList;
                        url = new URL(this.urls.list || '', this.host).href;
                        return [4 /*yield*/, this.request(this.methods.list, {
                                feature: feature,
                                url: url,
                                filters: toJS(valuesForList),
                                sortBy: sortBy,
                                sortDir: sortDir,
                                limit: rows,
                                offset: page * rows,
                            })];
                    case 1:
                        result = _b.sent();
                        if (result.status === 401) {
                            throw new Error(UNAUTHORIZED);
                        }
                        if (result.error) {
                            throw new Error(result.error);
                        }
                        return [2 /*return*/, result];
                }
            });
        }); };
        this.read = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var feature, url, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.availableApiFeatures.read) {
                            throw new Error('Specify feature api host, methods and urls first.');
                        }
                        feature = this.feature;
                        url = new URL(this.urls.read, this.host).href;
                        return [4 /*yield*/, this.request(this.methods.read, { url: url, feature: feature, id: id })];
                    case 1:
                        result = _a.sent();
                        if (result.status === 401) {
                            throw new Error(UNAUTHORIZED);
                        }
                        if (result.error) {
                            throw new Error(result.error);
                        }
                        return [2 /*return*/, result];
                }
            });
        }); };
        this.create = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var feature, url, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.availableApiFeatures.create) {
                            throw new Error('Specify feature api host, methods and urls first.');
                        }
                        feature = this.feature;
                        url = new URL(this.urls.create, this.host).href;
                        return [4 /*yield*/, this.request(this.methods.create, { url: url, feature: feature, data: data })];
                    case 1:
                        result = _a.sent();
                        if (result.status === 401) {
                            throw new Error(UNAUTHORIZED);
                        }
                        if (result.error) {
                            throw new Error(result.error);
                        }
                        return [2 /*return*/, result];
                }
            });
        }); };
        this.update = function (id, data) { return __awaiter(_this, void 0, void 0, function () {
            var feature, url, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.availableApiFeatures.update) {
                            throw new Error('Specify feature api host, methods and urls first.');
                        }
                        feature = this.feature;
                        url = new URL(this.urls.update, this.host).href;
                        return [4 /*yield*/, this.request(this.methods.update, { url: url, feature: feature, data: data, id: id })];
                    case 1:
                        result = _a.sent();
                        if (result.status === 401) {
                            throw new Error(UNAUTHORIZED);
                        }
                        if (result.error) {
                            throw new Error(result.error);
                        }
                        return [2 /*return*/, result];
                }
            });
        }); };
        this.delete = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.availableApiFeatures.delete) {
                            throw new Error('Specify feature api host, methods and urls first.');
                        }
                        url = new URL(this.urls.delete, this.host).href;
                        return [4 /*yield*/, this.request(this.methods.delete, {
                                url: url,
                                feature: this.feature,
                                id: id,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    Object.defineProperty(FeatureApi.prototype, "methods", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.feature.options) === null || _a === void 0 ? void 0 : _a.api) === null || _b === void 0 ? void 0 : _b.methods;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureApi.prototype, "host", {
        get: function () {
            var _a;
            return ((_a = this.feature.parent) === null || _a === void 0 ? void 0 : _a.host) || 'http://localhost';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureApi.prototype, "urls", {
        get: function () {
            var _a, _b;
            var urls = (_b = (_a = this.feature.options) === null || _a === void 0 ? void 0 : _a.api) === null || _b === void 0 ? void 0 : _b.urls;
            var list = (urls === null || urls === void 0 ? void 0 : urls.list) || '';
            var read = (urls === null || urls === void 0 ? void 0 : urls.read) || list;
            var update = (urls === null || urls === void 0 ? void 0 : urls.update) || read;
            var create = (urls === null || urls === void 0 ? void 0 : urls.create) || read;
            var del = (urls === null || urls === void 0 ? void 0 : urls.delete) || read;
            var ex = (urls === null || urls === void 0 ? void 0 : urls.export) || read;
            return {
                list: list,
                read: read,
                update: update,
                create: create,
                delete: del,
                export: ex,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureApi.prototype, "data", {
        get: function () {
            return this.feature.data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureApi.prototype, "references", {
        get: function () {
            var _a;
            return (_a = this.feature.options.api) === null || _a === void 0 ? void 0 : _a.references;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureApi.prototype, "request", {
        get: function () {
            var _a, _b;
            var authorization = (_b = (_a = this.feature.parent) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.user.token;
            return function (cb, props) {
                return cb(__assign(__assign({}, props), (authorization ? { authorization: authorization } : {})));
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FeatureApi.prototype, "availableApiFeatures", {
        get: function () {
            var _this = this;
            return Object.values(FeatureFeature).reduce(function (acc, mode) {
                var _a;
                return (__assign(__assign({}, acc), (_a = {}, _a[mode] = !!(_this.host &&
                    has(mode, _this.methods) &&
                    _this.feature.availableFeatures[mode]), _a)));
            }, {});
        },
        enumerable: false,
        configurable: true
    });
    FeatureApi.prototype.getReferencesAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refs;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!keys(this.references).length || !this.feature)
                            return [2 /*return*/];
                        refs = keys(this.references);
                        return [4 /*yield*/, Promise.all(refs.map(function (ref) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            this.data.references[ref].isLoadingAll = true;
                                            _a = this.data.references[ref];
                                            return [4 /*yield*/, this.request(getReferenceAll, {
                                                    feature: this.feature,
                                                    name: ref,
                                                    host: this.host,
                                                })];
                                        case 1:
                                            _a.all = _b.sent();
                                            this.feature.data.references[ref].isLoadingAll = false;
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        computed
    ], FeatureApi.prototype, "methods", null);
    __decorate([
        computed
    ], FeatureApi.prototype, "host", null);
    __decorate([
        computed
    ], FeatureApi.prototype, "urls", null);
    __decorate([
        computed
    ], FeatureApi.prototype, "data", null);
    __decorate([
        computed
    ], FeatureApi.prototype, "references", null);
    __decorate([
        computed
    ], FeatureApi.prototype, "request", null);
    __decorate([
        action
    ], FeatureApi.prototype, "useFeature", void 0);
    __decorate([
        computed
    ], FeatureApi.prototype, "availableApiFeatures", null);
    __decorate([
        action
    ], FeatureApi.prototype, "list", void 0);
    __decorate([
        action
    ], FeatureApi.prototype, "read", void 0);
    __decorate([
        action
    ], FeatureApi.prototype, "create", void 0);
    __decorate([
        action
    ], FeatureApi.prototype, "update", void 0);
    __decorate([
        action
    ], FeatureApi.prototype, "delete", void 0);
    __decorate([
        action
    ], FeatureApi.prototype, "getReferencesAll", null);
    return FeatureApi;
}());
export { FeatureApi };
