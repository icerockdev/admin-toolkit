/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { computed, observable } from 'mobx';
import { FeatureListRenderer, } from '../../components/list/FeatureListRenderer';
import { FeatureRendererRouter } from '../../components/router/FeatureRendererRouter';
import { FeatureReadRenderer, } from '../../components/read/FeatureReadRenderer';
var FeatureRenderer = /** @class */ (function () {
    function FeatureRenderer(_a) {
        var _b = _a === void 0 ? {} : _a, containers = _b.containers, components = _b.components;
        this.list = FeatureListRenderer;
        this.read = FeatureReadRenderer;
        this.create = FeatureReadRenderer;
        this.update = FeatureReadRenderer;
        if (containers === null || containers === void 0 ? void 0 : containers.list) {
            this.list = containers.list;
        }
        if (containers === null || containers === void 0 ? void 0 : containers.read) {
            this.read = containers.read;
        }
        if (containers === null || containers === void 0 ? void 0 : containers.create) {
            this.create = containers.create;
        }
        if (containers === null || containers === void 0 ? void 0 : containers.update) {
            this.update = containers.update;
        }
        if (components) {
            this.components = components;
        }
    }
    Object.defineProperty(FeatureRenderer.prototype, "output", {
        get: function () {
            return (React.createElement(FeatureRendererRouter, { list: this.list, read: this.read, create: this.create, update: this.update, components: this.components }));
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        observable
    ], FeatureRenderer.prototype, "list", void 0);
    __decorate([
        observable
    ], FeatureRenderer.prototype, "read", void 0);
    __decorate([
        observable
    ], FeatureRenderer.prototype, "create", void 0);
    __decorate([
        observable
    ], FeatureRenderer.prototype, "update", void 0);
    __decorate([
        observable
    ], FeatureRenderer.prototype, "components", void 0);
    __decorate([
        computed
    ], FeatureRenderer.prototype, "output", null);
    return FeatureRenderer;
}());
export { FeatureRenderer };
