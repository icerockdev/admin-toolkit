import React from 'react';
import { Feature } from '~/application/modules/pages/Feature';
import { FeatureRendererProps } from '../../types/renderer';
import { computed, observable } from 'mobx';
import {
  FeatureListRenderer,
  FeatureListRendererComponent,
  FeatureListRendererProps,
} from '~/application/modules/pages/Feature/components/renderers/list/FeatureListRenderer';
import { FeatureRendererRouter } from '~/application/modules/pages/Feature/components/router/FeatureRendererRouter';
import {
  FeatureReadRenderer,
  FeatureReadRendererComponent,
  FeatureReadRendererProps,
} from '~/application/modules/pages/Feature/components/renderers/read/FeatureReadRenderer';

export class FeatureRenderer<T extends Feature<any> = Feature<any>> {
  constructor({ containers, components }: FeatureRendererProps = {}) {
    if (containers?.list) {
      this.list = containers.list;
    }

    if (containers?.read) {
      this.read = containers.read;
    }

    if (containers?.create) {
      this.create = containers.create;
    }

    if (containers?.update) {
      this.update = containers.update;
    }

    if (components) {
      this.components = components;
    }
  }

  @observable list: FeatureListRendererComponent = FeatureListRenderer;
  @observable read: FeatureReadRendererComponent = FeatureReadRenderer;
  @observable create: FeatureReadRendererComponent = FeatureReadRenderer;
  @observable update: FeatureReadRendererComponent = FeatureReadRenderer;

  @observable components: FeatureRendererProps['components'];

  @computed
  get output(): JSX.Element {
    return (
      <FeatureRendererRouter
        list={this.list}
        read={this.read}
        create={this.create}
        update={this.update}
        components={this.components}
      />
    );
  }
}
