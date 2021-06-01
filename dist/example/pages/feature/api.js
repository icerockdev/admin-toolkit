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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { generateBaseData } from './mock';
var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
export var getFeatureList = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var url = _a.url, props = __rest(_a, ["url"]);
    return __generator(this, function (_b) {
        console.log("LIST " + url, __assign({ url: url }, props));
        return [2 /*return*/, delay(500).then(function () { return ({
                data: generateBaseData(props.limit),
                count: 100,
                status: 200,
                error: '',
            }); })];
    });
}); };
export var getFeature = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var items, href;
    var url = _a.url, id = _a.id, props = __rest(_a, ["url", "id"]);
    return __generator(this, function (_b) {
        items = parseInt(id, 10) || 0;
        href = [url, id].join('');
        console.log("READ " + href, __assign({ url: url, id: id }, props));
        return [2 /*return*/, delay(500).then(function () { return ({
                data: generateBaseData(items + 1)[items],
                status: 200,
                error: '',
            }); })];
    });
}); };
export var createFeature = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var url = _a.url, props = __rest(_a, ["url"]);
    return __generator(this, function (_b) {
        console.log("CREATE " + url, __assign({ url: url }, props));
        return [2 /*return*/, delay(500).then(function () { return ({
                data: generateBaseData(1)[0],
                status: 200,
                error: '',
            }); })];
    });
}); };
export var updateFeature = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var url = _a.url, id = _a.id, props = __rest(_a, ["url", "id"]);
    return __generator(this, function (_b) {
        console.log("UPDATE " + url, __assign({ url: url }, props));
        return [2 /*return*/, delay(500).then(function () { return ({
                data: generateBaseData(id + 1)[id],
                status: 200,
                error: '',
            }); })];
    });
}); };
export var deleteFeature = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var url = _a.url, id = _a.id, props = __rest(_a, ["url", "id"]);
    return __generator(this, function (_b) {
        console.log("DELETE " + url, __assign({ url: url }, props));
        return [2 /*return*/, delay(500).then(function () { })];
    });
}); };
export var getRolesAll = function (props) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, delay(1000)];
            case 1:
                _a.sent();
                console.log("REFERENCE " + props.url, props);
                return [2 /*return*/, {
                        10: 'User',
                        20: 'Manager',
                        30: 'Admin',
                    }];
        }
    });
}); };
