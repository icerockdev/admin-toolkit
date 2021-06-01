/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
var PageRenderer = observer(function (_a) {
    var page = _a.page;
    var t = useTranslation().t;
    useEffect(function () {
        if (page.onMount)
            page.onMount(page);
        return function () {
            if (page.onUnmount)
                page.onUnmount(page);
        };
    }, [page]);
    return (React.createElement("div", { className: "renderer", style: { height: '100%' } },
        React.createElement(Helmet, null,
            React.createElement("title", null, t(page.title))),
        React.createElement(page.output, null)));
});
export { PageRenderer };
