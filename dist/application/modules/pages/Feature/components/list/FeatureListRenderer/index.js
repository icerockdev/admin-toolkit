import React from 'react';
import { FeatureListContainer } from '../FeatureListContainer';
import { FeatureListWrapper } from '../FeatureListWrapper';
import { FeatureListTitle } from '../FeatureListTitle';
import { FeatureListPagination } from '../FeatureListPagination';
import { FeatureListFooter } from '../FeatureListFooter';
import { FeatureListHeader } from '../FeatureListHeader';
import { FeatureListButtons } from '../FeatureListButtons';
import { FeatureListFilters } from '../FeatureListFilters';
import { FeatureListTable } from '../FeatureListTable';
import { observer } from 'mobx-react';
export var FeatureListRenderer = observer(function (_a) {
    var _b = _a.wrapper, Wrapper = _b === void 0 ? FeatureListWrapper : _b, _c = _a.header, Header = _c === void 0 ? FeatureListHeader : _c, _d = _a.container, Container = _d === void 0 ? FeatureListContainer : _d, _e = _a.title, Title = _e === void 0 ? FeatureListTitle : _e, _f = _a.buttons, Buttons = _f === void 0 ? FeatureListButtons : _f, _g = _a.filters, Filters = _g === void 0 ? FeatureListFilters : _g, _h = _a.table, Table = _h === void 0 ? FeatureListTable : _h, _j = _a.pagination, Pagination = _j === void 0 ? FeatureListPagination : _j, _k = _a.footer, Footer = _k === void 0 ? FeatureListFooter : _k;
    return (React.createElement(Wrapper, null,
        React.createElement(Header, null),
        React.createElement(Container, { title: Title, buttons: Buttons, filters: Filters, pagination: Pagination },
            React.createElement(Table, null)),
        React.createElement(Footer, null)));
});
