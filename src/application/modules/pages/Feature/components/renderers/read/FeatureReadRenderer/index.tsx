import React from 'react';
import { FeatureReadRendererProps } from '~/application/modules/pages/Feature/types/renderer';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { FeatureRendererComponent } from '~/application/modules/pages/Feature/components/renderers/FeatureRendererComponent';
import { FeatureReadWrapper } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadWrapper';
import { FeatureReadContainer } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadContainer';
import { FeatureReadHeader } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadHeader';
import { FeatureReadFooter } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadFooter';
import { FeatureReadTitle } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadTitle';
import { FeatureReadButtons } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadButtons';
import { FeatureReadBreadcrumbs } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadBreadcrumbs';
import { FeatureReadContent } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadContent';
import { FeatureReadSubmit } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadSubmit';

export class FeatureReadRenderer extends FeatureRendererComponent {
  constructor(props?: Partial<FeatureReadRendererProps>) {
    super();

    if (props?.wrapper) this.Wrapper = props.wrapper;
    if (props?.header) this.Header = props.header;
    if (props?.footer) this.Footer = props.footer;
    if (props?.title) this.Title = props.title;
    if (props?.buttons) this.Buttons = props.buttons;
    if (props?.container) this.Container = props.container;
    if (props?.breadcrumbs) this.Breadcrumbs = props.breadcrumbs;
    if (props?.content) this.Content = props.content;
    if (props?.submit) this.Submit = props.submit;
  }

  Wrapper: FeatureReadRendererProps['wrapper'] = FeatureReadWrapper;
  Container: FeatureReadRendererProps['container'] = FeatureReadContainer;
  Header: FeatureReadRendererProps['header'] = FeatureReadHeader;
  Footer: FeatureReadRendererProps['footer'] = FeatureReadFooter;
  Title: FeatureReadRendererProps['title'] = FeatureReadTitle;
  Buttons: FeatureReadRendererProps['buttons'] = FeatureReadButtons;
  Breadcrumbs: FeatureReadRendererProps['breadcrumbs'] = FeatureReadBreadcrumbs;
  Content: FeatureReadRendererProps['content'] = FeatureReadContent;
  Submit: FeatureReadRendererProps['submit'] = FeatureReadSubmit;

  @computed
  get output() {
    return observer(() => (
      <this.Wrapper>
        <this.Header />
        <this.Container
          title={this.Title}
          buttons={this.Buttons}
          breadcrumbs={this.Breadcrumbs}
          submit={this.Submit}
        >
          <this.Content />
        </this.Container>
        <this.Footer />
      </this.Wrapper>
    ));
  }
}
