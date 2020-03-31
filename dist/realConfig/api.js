/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
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
import { ENTITY_ERRORS, } from '../application';
import axios from 'axios';
export var fetchItemsFn = function (_a) {
    var url = _a.url, token = _a.token, page = _a.page, limit = _a.count, sortBy = _a.sortBy, sortDir = _a.sortDir, filter = _a.filter;
    return __awaiter(void 0, void 0, void 0, function () {
        var offset, orderBy, result, totalCount, error_1;
        var _b;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    offset = (page && limit && page * limit) || 0;
                    orderBy = sortDir.toUpperCase();
                    return [4 /*yield*/, axios
                            .get(url, {
                            headers: { Authorization: token },
                            params: __assign({ offset: offset,
                                limit: limit,
                                sortBy: sortBy,
                                orderBy: orderBy }, ((filter === null || filter === void 0 ? void 0 : filter.name) ? (_b = {}, _b[filter.name] = filter === null || filter === void 0 ? void 0 : filter.value, _b) : {})),
                        })
                            .catch(function (e) { return e; })];
                case 1:
                    result = _e.sent();
                    totalCount = parseInt(result.headers['x-total-count'] || 0);
                    if (!result.data || !(result.data.success || result.data.isSuccess)) {
                        throw new Error(((_d = (_c = result.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || ENTITY_ERRORS.CANT_LOAD_ITEMS);
                    }
                    return [2 /*return*/, Promise.resolve({
                            data: { list: result.data.data, totalCount: totalCount },
                            error: '',
                        })];
                case 2:
                    error_1 = _e.sent();
                    return [2 /*return*/, {
                            data: { list: [], totalCount: 0 },
                            error: error_1.message,
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
export var getItemsFn = function (_a) {
    var url = _a.url, token = _a.token, id = _a.id;
    return __awaiter(void 0, void 0, void 0, function () {
        var result, error_2;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios
                            .get(url + "/" + id, { headers: { Authorization: token } })
                            .catch(function (e) { return e; })];
                case 1:
                    result = _d.sent();
                    if (!result.data || !(result.data.success || result.data.isSuccess)) {
                        throw new Error(((_c = (_b = result.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || ENTITY_ERRORS.CANT_LOAD_ITEMS);
                    }
                    return [2 /*return*/, Promise.resolve({
                            data: result.data.data,
                            error: '',
                        })];
                case 2:
                    error_2 = _d.sent();
                    return [2 /*return*/, {
                            data: {},
                            error: error_2.message,
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
export var updateItemsFn = function (_a) {
    var url = _a.url, token = _a.token, data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        var result, error_3;
        var _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios
                            .put(url + "/" + data.id, data, { headers: { Authorization: token } })
                            .catch(function (e) { return e; })];
                case 1:
                    result = _g.sent();
                    console.log({ result: result });
                    if (!result.data || !(result.data.success || result.data.isSuccess)) {
                        throw new Error(((_d = (_c = (_b = result.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.dataList[0]) === null || _d === void 0 ? void 0 : _d.message) || ((_f = (_e = result.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.message) ||
                            ENTITY_ERRORS.CANT_UPDATE_ITEM);
                    }
                    return [2 /*return*/, Promise.resolve({
                            data: result.data.data,
                            error: '',
                        })];
                case 2:
                    error_3 = _g.sent();
                    return [2 /*return*/, {
                            data: {},
                            error: error_3.message,
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
export var createItemsFn = function (_a) {
    var url = _a.url, token = _a.token, data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        var result, error_4;
        var _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios
                            .post("" + url, data, { headers: { Authorization: token } })
                            .catch(function (e) { return e; })];
                case 1:
                    result = _g.sent();
                    if (!result.data || !(result.data.success || result.data.isSuccess)) {
                        throw new Error(((_d = (_c = (_b = result.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.dataList[0]) === null || _d === void 0 ? void 0 : _d.message) || ((_f = (_e = result.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.message) || ENTITY_ERRORS.CANT_UPDATE_ITEM);
                    }
                    return [2 /*return*/, Promise.resolve({
                            data: result.data.data,
                            error: '',
                        })];
                case 2:
                    error_4 = _g.sent();
                    return [2 /*return*/, {
                            data: {},
                            error: error_4.message,
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
