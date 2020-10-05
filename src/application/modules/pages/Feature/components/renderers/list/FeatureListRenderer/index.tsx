import React, { createElement, FC } from 'react';
import { FeatureListContainer } from '~/application/modules/pages/Feature/components/renderers/list/FeatureListContainer';
import { FeatureListWrapper } from '~/application/modules/pages/Feature/components/renderers/list/FeatureListWrapper';
import { FeatureListTitle } from '~/application/modules/pages/Feature/components/renderers/list/FeatureListTitle';
import { FeatureListPagination } from '~/application/modules/pages/Feature/components/renderers/list/FeatureListPagination';
import { FeatureListFooter } from '~/application/modules/pages/Feature/components/renderers/list/FeatureListFooter';
import { FeatureListHeader } from '~/application/modules/pages/Feature/components/renderers/list/FeatureListHeader';
import { FeatureListButtons } from '~/application/modules/pages/Feature/components/renderers/list/FeatureListButtons';
import { FeatureListFilters } from '~/application/modules/pages/Feature/components/renderers/list/FeatureListFilters';
import { FeatureListTable } from '~/application/modules/pages/Feature/components/renderers/list/FeatureListTable';
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

        <Container title={Title} buttons={Buttons} filters={Filters}>
          <Table />
        </Container>

        <Pagination />
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
};
