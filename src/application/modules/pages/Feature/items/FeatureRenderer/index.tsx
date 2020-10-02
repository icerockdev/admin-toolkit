import React from 'react';
import { Feature } from '~/application/modules/pages/Feature';
import { FeatureRendererProps } from '../../types/renderer';
import { computed, observable } from 'mobx';
import {
  FeatureListRenderer,
  FeatureListRendererComponent,
} from '~/application/modules/pages/Feature/components/renderers/list/FeatureListRenderer';
import { FeatureRendererComponent } from '~/application/modules/pages/Feature/components/renderers/FeatureRendererComponent';
import { FeatureRendererRouter } from '~/application/modules/pages/Feature/components/router/FeatureRendererRouter';
import { FeatureReadRenderer } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadRenderer';

export class FeatureRenderer<T extends Feature<any> = Feature<any>> {
  constructor(props?: FeatureRendererProps) {
    if (props?.list) {
      this.list = props?.list;
    }

    this.read =
      props?.renderers?.read || new FeatureReadRenderer(props?.read || {});

    this.create =
      props?.renderers?.create || new FeatureReadRenderer(props?.create || {});

    this.update =
      props?.renderers?.update || new FeatureReadRenderer(props?.update || {});
  }

  @observable list: FeatureListRendererComponent = FeatureListRenderer;
  @observable read: FeatureRendererComponent = new FeatureReadRenderer();
  @observable create: FeatureRendererComponent = new FeatureReadRenderer();
  @observable update: FeatureRendererComponent = new FeatureReadRenderer();

  @computed
  get output(): JSX.Element {
    return (
      <FeatureRendererRouter
        list={this.list}
        read={this.read}
        create={this.create}
        update={this.update}
      />
    );
  }
}
