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

export class CrudlListRenderer extends CrudlRendererComponent {
  constructor(props?: Partial<CrudlListRendererProps>) {
    super();

    if (props?.header) this.Header = props.header;
    if (props?.footer) this.Footer = props.footer;
    if (props?.title) this.Title = props.title;
    if (props?.buttons) this.Buttons = props.buttons;
    if (props?.wrapper) this.Wrapper = props.wrapper;
    if (props?.container) this.Container = props.container;
    if (props?.pagination) this.Pagination = props.pagination;
  }

  Buttons: CrudlListRendererProps['buttons'] = () => <div>BUTTONS</div>;
  Filters: CrudlListRendererProps['filters'] = () => <div>FILTERS</div>;

  Header: CrudlListRendererProps['header'] = CrudlListHeader;
  Wrapper: CrudlListRendererProps['wrapper'] = CrudlListWrapper;
  Container: CrudlListRendererProps['container'] = CrudlListContainer;
  Title: CrudlListRendererProps['title'] = CrudlListTitle;
  Pagination: CrudlListRendererProps['pagination'] = CrudlListPagination;
  Footer: CrudlListRendererProps['footer'] = CrudlListFooter;

  @computed
  get output() {
    return () => (
      <this.Wrapper>
        <this.Header />
        <this.Container
          title={this.Title}
          buttons={this.Buttons}
          filters={this.Filters}
        >
          CONTENT
        </this.Container>
        <this.Footer />
        <this.Pagination />
      </this.Wrapper>
    );
  }
}
