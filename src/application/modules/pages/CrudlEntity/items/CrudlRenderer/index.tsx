import React from 'react';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CrudlRendererProps } from '../../types/renderer';
import { computed, observable } from 'mobx';
import { CrudlListRenderer } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListRenderer';
import { CrudlRendererComponent } from '~/application/modules/pages/CrudlEntity/components/renderers/CrudlRendererComponent';
import { CrudlRendererRouter } from '~/application/modules/pages/CrudlEntity/components/router/CrudlRendererRouter';

export class CrudlRenderer<T extends CrudlEntity<any> = CrudlEntity<any>> {
  constructor(props?: CrudlRendererProps) {
    this.list =
      props?.renderers?.list || new CrudlListRenderer(props?.list || {});

    // TODO: same here
    if (props?.renderers?.read) this.read = props.renderers.read;
    // TODO: same here
    if (props?.renderers?.create) this.create = props.renderers.create;
    // TODO: same here
    if (props?.renderers?.update) this.update = props.renderers.update;
  }

  @observable list: CrudlRendererComponent = new CrudlListRenderer();
  @observable read: CrudlRendererComponent = new CrudlRendererComponent();
  @observable create: CrudlRendererComponent = new CrudlRendererComponent();
  @observable update: CrudlRendererComponent = new CrudlRendererComponent();

  @computed
  get output(): JSX.Element {
    return <CrudlRendererRouter list={this.list} />;
  }
}
