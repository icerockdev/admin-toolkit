/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import React from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';
var EntityListWrapper = observer(function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: styles.wrap }, children));
});
export { EntityListWrapper };
