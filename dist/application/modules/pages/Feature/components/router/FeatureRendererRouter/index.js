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
import React, { useCallback, useEffect, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useFeature } from '../../../../../../utils/hooks';
import { useLocation } from 'react-router';
import { FeatureMode } from '../../../types';
var FeatureRendererRouter = observer(function (_a) {
    var List = _a.list, Read = _a.read, Create = _a.create, Update = _a.update, components = _a.components;
    var location = useLocation();
    var feature = useFeature();
    var id = feature.controller.getIdFromUrl();
    var mode = useMemo(function () {
        switch (location.pathname) {
            case feature.url + "/" + FeatureMode.create + "/":
            case feature.url + "/" + FeatureMode.create:
                return FeatureMode.create;
            case feature.url + "/" + id + "/" + FeatureMode.update + "/":
            case feature.url + "/" + id + "/" + FeatureMode.update:
                return FeatureMode.update;
            case feature.url + "/" + id + "/":
            case feature.url + "/" + id:
                return FeatureMode.read;
            default:
                return FeatureMode.list;
        }
    }, [feature, location.pathname, id]);
    var onEnter = useCallback(function () {
        feature.mode = mode;
    }, [feature, mode]);
    useEffect(function () {
        onEnter(mode, id);
    }, [mode, id]);
    var features = feature.features, url = feature.url;
    return (React.createElement(Switch, null,
        React.createElement(Route, { exact: true, path: feature.url, render: function () { return React.createElement(List, __assign({}, ((components === null || components === void 0 ? void 0 : components.list) || {}))); } }),
        features.read && (React.createElement(Route, { exact: true, path: url + "/:id", render: function () { return React.createElement(Read, __assign({}, ((components === null || components === void 0 ? void 0 : components.read) || {}))); } })),
        features.create && (React.createElement(Route, { exact: true, path: url + "/" + FeatureMode.create, render: function () { return React.createElement(Create, __assign({}, ((components === null || components === void 0 ? void 0 : components.create) || {}))); } })),
        features.update && (React.createElement(Route, { exact: true, path: url + "/:id/" + FeatureMode.update, render: function () { return React.createElement(Update, __assign({}, ((components === null || components === void 0 ? void 0 : components.update) || {}))); } })),
        React.createElement(Redirect, { to: feature.url || '' })));
});
export { FeatureRendererRouter };
