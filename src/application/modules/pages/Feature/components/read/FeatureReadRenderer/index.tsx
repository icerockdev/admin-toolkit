/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { FeatureReadWrapper } from '~/application/modules/pages/Feature/components/read/FeatureReadWrapper';
import { FeatureReadContainer } from '~/application/modules/pages/Feature/components/read/FeatureReadContainer';
import { FeatureReadFooter } from '~/application/modules/pages/Feature/components/read/FeatureReadFooter';
import { FeatureReadHeader } from '~/application/modules/pages/Feature/components/read/FeatureReadHeader';
import { FeatureReadButtons } from '~/application/modules/pages/Feature/components/read/FeatureReadButtons';
import { FeatureReadTitle } from '~/application/modules/pages/Feature/components/read/FeatureReadTitle';
import { FeatureReadBreadcrumbs } from '~/application/modules/pages/Feature/components/read/FeatureReadBreadcrumbs';
import { FeatureReadContent } from '~/application/modules/pages/Feature/components/read/FeatureReadContent';
import { FeatureReadSubmit } from '~/application/modules/pages/Feature/components/read/FeatureReadSubmit';

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
