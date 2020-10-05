import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { FeatureReadWrapper } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadWrapper';
import { FeatureReadContainer } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadContainer';
import { FeatureReadFooter } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadFooter';
import { FeatureReadHeader } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadHeader';
import { FeatureReadButtons } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadButtons';
import { FeatureReadTitle } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadTitle';
import { FeatureReadBreadcrumbs } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadBreadcrumbs';
import { FeatureReadContent } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadContent';
import { FeatureReadSubmit } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadSubmit';

export const FeatureReadRenderer: FeatureReadRendererComponent = observer(
  ({
    wrapper: Wrapper = FeatureReadWrapper,
    container: Container = FeatureReadContainer,
    header: Header = FeatureReadHeader,
    footer: Footer = FeatureReadFooter,
    title: Title = FeatureReadTitle,
    buttons: Buttons = FeatureReadButtons,
    breadcrumbs: Breadcrumbs = FeatureReadBreadcrumbs,
    content: Content = FeatureReadContent,
    submit: Submit = FeatureReadSubmit,
  }) => {
    return (
      <Wrapper>
        <Header />
        <Container
          title={Title}
          buttons={Buttons}
          breadcrumbs={Breadcrumbs}
          submit={Submit}
        >
          <Content />
        </Container>
        <Footer />
      </Wrapper>
    );
  }
);

export type FeatureReadRendererComponent = FC<
  Partial<FeatureReadRendererProps>
>;

export type FeatureReadRendererProps = Record<
  | 'wrapper'
  | 'header'
  | 'footer'
  | 'title'
  | 'buttons'
  | 'breadcrumbs'
  | 'content'
  | 'submit',
  FC
> & {
  container: FC<FeatureReadContainerProps>;
};

export type FeatureReadContainerProps = {
  title: FC;
  buttons: FC;
  breadcrumbs: FC;
  submit: FC;
};
