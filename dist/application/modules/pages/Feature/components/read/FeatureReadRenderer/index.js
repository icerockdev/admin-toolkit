import React from 'react';
import { observer } from 'mobx-react';
import { FeatureReadWrapper } from '../FeatureReadWrapper';
import { FeatureReadContainer } from '../FeatureReadContainer';
import { FeatureReadFooter } from '../FeatureReadFooter';
import { FeatureReadHeader } from '../FeatureReadHeader';
import { FeatureReadButtons } from '../FeatureReadButtons';
import { FeatureReadTitle } from '../FeatureReadTitle';
import { FeatureReadBreadcrumbs } from '../FeatureReadBreadcrumbs';
import { FeatureReadContent } from '../FeatureReadContent';
import { FeatureReadSubmit } from '../FeatureReadSubmit';
export var FeatureReadRenderer = observer(function (_a) {
    var _b = _a.wrapper, Wrapper = _b === void 0 ? FeatureReadWrapper : _b, _c = _a.container, Container = _c === void 0 ? FeatureReadContainer : _c, _d = _a.header, Header = _d === void 0 ? FeatureReadHeader : _d, _e = _a.footer, Footer = _e === void 0 ? FeatureReadFooter : _e, _f = _a.title, Title = _f === void 0 ? FeatureReadTitle : _f, _g = _a.buttons, Buttons = _g === void 0 ? FeatureReadButtons : _g, _h = _a.breadcrumbs, Breadcrumbs = _h === void 0 ? FeatureReadBreadcrumbs : _h, _j = _a.content, Content = _j === void 0 ? FeatureReadContent : _j, _k = _a.submit, Submit = _k === void 0 ? FeatureReadSubmit : _k;
    return (React.createElement(Wrapper, null,
        React.createElement(Header, null),
        React.createElement(Container, { title: Title, buttons: Buttons, breadcrumbs: Breadcrumbs, submit: Submit },
            React.createElement(Content, null)),
        React.createElement(Footer, null)));
});
