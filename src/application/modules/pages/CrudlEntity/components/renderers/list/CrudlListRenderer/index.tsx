import { CrudlRendererComponent } from '~/application/modules/pages/CrudlEntity/components/renderers/CrudlRendererComponent';
import React from 'react';
import { computed } from 'mobx';
import { CrudlListRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import { CrudlListContainer } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListContainer';
import { CrudlListWrapper } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListWrapper';
import { CrudlListTitle } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListTitle';
import { CrudlListPagination } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListPagination';
import { CrudlListFooter } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListFooter';
import { CrudlListHeader } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListHeader';
import { CrudlListButtons } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListButtons';
import { CrudlListFilters } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListFilters';
import { CrudlListTable } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListTable';
import { observer } from 'mobx-react';

export class CrudlListRenderer extends CrudlRendererComponent {
  constructor(props?: Partial<CrudlListRendererProps>) {
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

  Wrapper: CrudlListRendererProps['wrapper'] = CrudlListWrapper;
  Container: CrudlListRendererProps['container'] = CrudlListContainer;
  Header: CrudlListRendererProps['header'] = CrudlListHeader;
  Footer: CrudlListRendererProps['footer'] = CrudlListFooter;
  Title: CrudlListRendererProps['title'] = CrudlListTitle;
  Buttons: CrudlListRendererProps['buttons'] = CrudlListButtons;
  Filters: CrudlListRendererProps['filters'] = CrudlListFilters;
  Pagination: CrudlListRendererProps['pagination'] = CrudlListPagination;
  Table: CrudlListRendererProps['table'] = CrudlListTable;

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
