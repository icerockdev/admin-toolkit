import { FeatureRendererComponent } from '~/application/modules/pages/Feature/components/renderers/FeatureRendererComponent';
import React from 'react';
import { computed } from 'mobx';
import { FeatureListRendererProps } from '~/application/modules/pages/Feature/types/renderer';
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

export class FeatureListRenderer extends FeatureRendererComponent {
  constructor(props?: Partial<FeatureListRendererProps>) {
    super();

    if (props?.wrapper) this.Wrapper = props.wrapper;
    if (props?.container) this.Container = props.container;
    if (props?.header) this.Header = props.header;
    if (props?.footer) this.Footer = props.footer;
    if (props?.title) this.Title = props.title;
    if (props?.buttons) this.Buttons = props.buttons;
    if (props?.filters) this.Filters = props?.filters;
    if (props?.pagination) this.Pagination = props.pagination;
    if (props?.table) this.Table = props.table;
  }

  Wrapper: FeatureListRendererProps['wrapper'] = FeatureListWrapper;
  Container: FeatureListRendererProps['container'] = FeatureListContainer;
  Header: FeatureListRendererProps['header'] = FeatureListHeader;
  Footer: FeatureListRendererProps['footer'] = FeatureListFooter;
  Title: FeatureListRendererProps['title'] = FeatureListTitle;
  Buttons: FeatureListRendererProps['buttons'] = FeatureListButtons;
  Filters: FeatureListRendererProps['filters'] = FeatureListFilters;
  Pagination: FeatureListRendererProps['pagination'] = FeatureListPagination;
  Table: FeatureListRendererProps['table'] = FeatureListTable;

  @computed
  get output() {
    return observer(() => (
      <this.Wrapper>
        <this.Header />

        <this.Container
          title={this.Title}
          buttons={this.Buttons}
          filters={this.Filters}
        >
          <this.Table />
        </this.Container>

        <this.Pagination />
        <this.Footer />
      </this.Wrapper>
    ));
  }
}
