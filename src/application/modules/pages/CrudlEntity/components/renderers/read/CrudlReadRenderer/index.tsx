import React from 'react';
import { CrudlReadRendererProps } from '~/application/modules/pages/CrudlEntity/types/renderer';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { CrudlRendererComponent } from '~/application/modules/pages/CrudlEntity/components/renderers/CrudlRendererComponent';
import { CrudlReadWrapper } from '~/application/modules/pages/CrudlEntity/components/renderers/read/CrudlReadWrapper';
import { CrudlReadContainer } from '~/application/modules/pages/CrudlEntity/components/renderers/read/CrudlReadContainer';
import { CrudlReadHeader } from '~/application/modules/pages/CrudlEntity/components/renderers/read/CrudlReadHeader';
import { CrudlReadFooter } from '~/application/modules/pages/CrudlEntity/components/renderers/read/CrudlReadFooter';
import { CrudlReadTitle } from '~/application/modules/pages/CrudlEntity/components/renderers/read/CrudlReadTitle';
import { CrudlReadButtons } from '~/application/modules/pages/CrudlEntity/components/renderers/read/CrudlReadButtons';
import { CrudlReadBreadcrumbs } from '~/application/modules/pages/CrudlEntity/components/renderers/read/CrudlReadBreadcrumbs';

export class CrudlReadRenderer extends CrudlRendererComponent {
  constructor(props?: Partial<CrudlReadRendererProps>) {
    super();

    if (props?.wrapper) this.Wrapper = props.wrapper;
    if (props?.header) this.Header = props.header;
    if (props?.footer) this.Footer = props.footer;
    if (props?.title) this.Title = props.title;
    if (props?.buttons) this.Buttons = props.buttons;
    if (props?.container) this.Container = props.container;
    if (props?.breadcrumbs) this.Breadcrumbs = props.breadcrumbs;
  }

  Wrapper: CrudlReadRendererProps['wrapper'] = CrudlReadWrapper;
  Container: CrudlReadRendererProps['container'] = CrudlReadContainer;
  Header: CrudlReadRendererProps['header'] = CrudlReadHeader;
  Footer: CrudlReadRendererProps['footer'] = CrudlReadFooter;
  Title: CrudlReadRendererProps['title'] = CrudlReadTitle;
  Buttons: CrudlReadRendererProps['buttons'] = CrudlReadButtons;
  Breadcrumbs: CrudlReadRendererProps['breadcrumbs'] = CrudlReadBreadcrumbs;

  @computed
  get output() {
    return observer(() => (
      <this.Wrapper>
        <this.Header />
        <this.Container
          title={this.Title}
          buttons={this.Buttons}
          breadcrumbs={this.Breadcrumbs}
        >
          <div>READ</div>
        </this.Container>
        <this.Footer />
      </this.Wrapper>
    ));
  }
}
