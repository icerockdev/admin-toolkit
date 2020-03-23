/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
var PageRenderer = observer(function (_a) {
    var page = _a.page;
    useEffect(function () {
        if (page.onMount)
            page.onMount(page);
        return function () {
            if (page.onUnmount)
                page.onUnmount(page);
        };
    }, []);
    return (React.createElement("div", { className: "renderer" },
        React.createElement(page.output, null)));
});
export { PageRenderer };
