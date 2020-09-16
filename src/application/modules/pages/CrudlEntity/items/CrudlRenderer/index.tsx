import React from 'react';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CrudlRendererProps } from '../../types/renderer';
import { computed, observable } from 'mobx';
import { CrudlListRenderer } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListRenderer';
import { CrudlRendererComponent } from '~/application/modules/pages/CrudlEntity/components/renderers/CrudlRendererComponent';
import { CrudlRendererRouter } from '~/application/modules/pages/CrudlEntity/components/router/CrudlRendererRouter';
import { CrudlReadRenderer } from '~/application/modules/pages/CrudlEntity/components/renderers/read/CrudlReadRenderer';

export class CrudlRenderer<T extends CrudlEntity<any> = CrudlEntity<any>> {
  constructor(props?: CrudlRendererProps) {
    this.list =
      props?.renderers?.list || new CrudlListRenderer(props?.list || {});

    this.read =
      props?.renderers?.read || new CrudlReadRenderer(props?.read || {});

    // TODO: same here
    if (props?.renderers?.create) this.create = props.renderers.create;
    // TODO: same here
    if (props?.renderers?.update) this.update = props.renderers.update;
  }

  @observable list: CrudlRendererComponent = new CrudlListRenderer();
  @observable read: CrudlRendererComponent = new CrudlReadRenderer();
  @observable create: CrudlRendererComponent = new CrudlRendererComponent();
  @observable update: CrudlRendererComponent = new CrudlRendererComponent();

  @computed
  get output(): JSX.Element {
    return <CrudlRendererRouter list={this.list} read={this.read} />;
  }
}
