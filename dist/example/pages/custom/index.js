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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { Entity } from '../../../application';
import { observer } from 'mobx-react';
import { SAMPLE_ENTITY_FIELDS } from '../entity/fields';
import { fetchEntityItemsFn, getEntityFn, updateEntityFn, createEntityFn, } from '../entity/api';
import { computed } from 'mobx';
var CustomEntity = /** @class */ (function (_super) {
    __extends(CustomEntity, _super);
    function CustomEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CustomEntity.prototype, "output", {
        get: function () {
            var _this = this;
            return observer(function () { return (React.createElement("div", null,
                React.createElement("h1", null, _this.title),
                React.createElement("div", null,
                    "This is cutom output. Btw, items count is ",
                    _this.data.length,
                    "."))); });
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        computed
    ], CustomEntity.prototype, "output", null);
    return CustomEntity;
}(Entity));
export default new CustomEntity({
    title: 'Custom entity',
    editable: true,
    viewable: true,
    creatable: true,
    exportable: true,
    selectable: false,
    api: {
        list: { url: '/custom/list', method: 'get' },
        update: { url: '/custom/update', method: 'patch' },
        create: { url: '/custom/create', method: 'post' },
        get: { url: '/custom/get', method: 'get' },
    },
    menu: {
        enabled: true,
        label: 'Custom',
        url: '/custom',
    },
    fields: SAMPLE_ENTITY_FIELDS,
    fetchItemsFn: function (_a) {
        var url = _a.url, page = _a.page, count = _a.count, token = _a.token, filter = _a.filter, sortBy = _a.sortBy, sortDir = _a.sortDir;
        return fetchEntityItemsFn({ url: url, page: page, count: count, token: token, filter: filter, sortBy: sortBy, sortDir: sortDir });
    },
    getItemsFn: function (_a) {
        var id = _a.id, url = _a.url, token = _a.token;
        return getEntityFn({ id: id, url: url, token: token });
    },
    updateItemsFn: function (_a) {
        var id = _a.id, data = _a.data, url = _a.url, token = _a.token;
        return updateEntityFn({ id: id, data: data, url: url, token: token });
    },
    createItemsFn: function (_a) {
        var data = _a.data, url = _a.url, token = _a.token;
        return createEntityFn({ data: data, url: url, token: token });
    },
});
