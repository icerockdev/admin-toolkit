/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { createElement, FC } from 'react';
import { FeatureListContainer } from '~/application/modules/pages/Feature/components/list/FeatureListContainer';
import { FeatureListWrapper } from '~/application/modules/pages/Feature/components/list/FeatureListWrapper';
import { FeatureListTitle } from '~/application/modules/pages/Feature/components/list/FeatureListTitle';
import { FeatureListPagination } from '~/application/modules/pages/Feature/components/list/FeatureListPagination';
import { FeatureListFooter } from '~/application/modules/pages/Feature/components/list/FeatureListFooter';
import { FeatureListHeader } from '~/application/modules/pages/Feature/components/list/FeatureListHeader';
import { FeatureListButtons } from '~/application/modules/pages/Feature/components/list/FeatureListButtons';
import { FeatureListFilters } from '~/application/modules/pages/Feature/components/list/FeatureListFilters';
import { FeatureListTable } from '~/application/modules/pages/Feature/components/list/FeatureListTable';
import { observer } from 'mobx-react';

export const FeatureListRenderer: FeatureListRendererComponent = observer(
  ({
    wrapper: Wrapper = FeatureListWrapper,
    header: Header = FeatureListHeader,
    container: Container = FeatureListContainer,
    title: Title = FeatureListTitle,
    buttons: Buttons = FeatureListButtons,
    filters: Filters = FeatureListFilters,
    table: Table = FeatureListTable,
    pagination: Pagination = FeatureListPagination,
    footer: Footer = FeatureListFooter,
  }) => {
    return (
      <Wrapper>
        <Header />

        <Container
          title={Title}
          buttons={Buttons}
          filters={Filters}
          pagination={Pagination}
        >
          <Table />
        </Container>

        <Footer />
      </Wrapper>
    );
  }
);

export type FeatureListRendererComponent = FC<
  Partial<FeatureListRendererProps>
>;

export type FeatureListRendererProps = Record<
  | 'wrapper'
  | 'header'
  | 'title'
  | 'buttons'
  | 'filters'
  | 'table'
  | 'pagination'
  | 'footer',
  FC
> & {
  container: FC<FeatureListRendererContainerProps>;
};

export type FeatureListRendererContainerProps = {
  title: FC;
  buttons: FC;
  filters: FC;
  pagination: FC;
};
