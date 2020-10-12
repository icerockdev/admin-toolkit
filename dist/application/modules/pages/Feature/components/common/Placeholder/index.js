import React from 'react';
import styles from './styles.module.scss';
import { observer } from 'mobx-react';
var Placeholder = observer(function (_a) {
    var _b = _a.width, width = _b === void 0 ? Math.random() * 20 + 50 + "%" : _b, _c = _a.height, height = _c === void 0 ? '1em' : _c, children = _a.children, _d = _a.isLoading, isLoading = _d === void 0 ? true : _d;
    return isLoading ? (React.createElement("div", { className: styles.placeholder, style: { width: width, height: height } })) : (React.createElement(React.Fragment, null, children));
});
export { Placeholder };
