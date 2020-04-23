/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
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
import { Config, AuthProvider, Page, Entity, } from './application';
import logo from './assets/logo512.png';
var SAMPLE_ENTITY_1 = {
    id: 1,
    type: 1,
    phone: '+7 000 000 000',
    title: 'First one',
    created: new Date().toISOString(),
    createdTime: new Date().toISOString(),
    number: '0.123123123',
    visible: true,
};
var SAMPLE_ENTITY_2 = {
    id: 2,
    type: 2,
    phone: '+7 000 000 000',
    title: 'First one',
    created: new Date().toISOString(),
    createdTime: new Date().toISOString(),
    number: 0.123123123,
    visible: true,
};
export default new Config({
    logo: logo,
    auth: new AuthProvider({
        authRequestFn: function (email, password) {
            return Promise.resolve({
                user: {
                    email: email,
                    username: email,
                    token: 'SAMPLE_TOKEN',
                    role: 'user',
                },
                error: '',
            });
        },
    }),
    pages: [
        new Entity({
            title: 'Sample entity',
            editable: true,
            viewable: false,
            creatable: true,
            exportable: true,
            api: {
                list: { url: '/list', method: 'get' },
                update: { url: '/update', method: 'patch' },
                create: { url: '/create', method: 'post' },
                get: { url: '/get', method: 'get' },
            },
            menu: {
                enabled: true,
                label: 'Sample entity',
                url: '/entity',
            },
            references: {
                type: {
                    getMany: function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, {
                                    1: 'variant 1',
                                    2: 'variant 2',
                                    3: 'variant 3',
                                }];
                        });
                    }); },
                },
            },
            fields: [
                {
                    name: 'type',
                    label: 'Тип',
                    sortable: true,
                    filterable: true,
                    type: 'referenceSelect',
                    required: true,
                },
                {
                    name: 'phone',
                    label: 'Телефон',
                    sortable: true,
                    type: 'string',
                    filterable: true,
                },
                {
                    name: 'title',
                    label: 'Заголовок',
                    sortable: true,
                    type: 'string',
                    title: true,
                    hideInCreate: true,
                },
                {
                    name: 'created',
                    label: 'Дата публикации',
                    sortable: true,
                    type: 'date',
                },
                {
                    name: 'createdTime',
                    label: 'Дата и время',
                    sortable: true,
                    type: 'datetime',
                },
                {
                    name: 'visible',
                    label: 'Видимость',
                    sortable: false,
                    type: 'boolean',
                },
                {
                    type: 'number',
                    name: 'number',
                    label: 'Количество',
                    sortable: true,
                    options: {
                        accuracy: 4,
                    },
                },
            ],
            fetchItemsFn: function () {
                var props = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    props[_i] = arguments[_i];
                }
                return new Promise(function (resolve) {
                    setTimeout(resolve, 500, {
                        data: {
                            list: [SAMPLE_ENTITY_1, SAMPLE_ENTITY_2],
                            totalPages: 10,
                        },
                    });
                });
            },
            updateItemsFn: function (_a) {
                var data = _a.data;
                return Promise.resolve({ error: '', data: data });
            },
            createItemsFn: function (_a) {
                var data = _a.data;
                return Promise.resolve({ error: '', data: data });
            },
            getItemsFn: function (_a) {
                var id = _a.id;
                return new Promise(function (resolve) {
                    return setTimeout(resolve, 500, {
                        data: SAMPLE_ENTITY_2,
                    });
                });
            },
        }),
        new Page({
            title: 'Sample page',
            menu: {
                enabled: true,
                url: '/test',
                label: 'Sample page',
            },
        }),
    ],
});
