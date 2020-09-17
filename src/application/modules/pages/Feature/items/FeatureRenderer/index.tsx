import React from 'react';
import { Feature } from '~/application/modules/pages/Feature';
import { FeatureRendererProps } from '../../types/renderer';
import { computed, observable } from 'mobx';
import { FeatureListRenderer } from '~/application/modules/pages/Feature/components/renderers/list/FeatureListRenderer';
import { FeatureRendererComponent } from '~/application/modules/pages/Feature/components/renderers/FeatureRendererComponent';
import { FeatureRendererRouter } from '~/application/modules/pages/Feature/components/router/FeatureRendererRouter';
import { FeatureReadRenderer } from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadRenderer';

export class FeatureRenderer<T extends Feature<any> = Feature<any>> {
  constructor(props?: FeatureRendererProps) {
    this.list =
      props?.renderers?.list || new FeatureListRenderer(props?.list || {});

    this.read =
      props?.renderers?.read || new FeatureReadRenderer(props?.read || {});

    // TODO: same here
    if (props?.renderers?.create) this.create = props.renderers.create;
    // TODO: same here
    if (props?.renderers?.update) this.update = props.renderers.update;
  }

  @observable list: FeatureRendererComponent = new FeatureListRenderer();
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
