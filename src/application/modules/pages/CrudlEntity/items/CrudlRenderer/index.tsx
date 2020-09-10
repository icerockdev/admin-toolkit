import React from 'react';
import { CrudlEntity } from '~/application/modules/pages/CrudlEntity';
import { CrudlRendererProps } from '../../types/renderer';
import { computed, observable } from 'mobx';
import { CrudlListRenderer } from '~/application/modules/pages/CrudlEntity/components/renderers/list/CrudlListRenderer';
import { CrudlRendererComponent } from '~/application/modules/pages/CrudlEntity/components/renderers/CrudlRendererComponent';
import { CrudlRendererRouter } from '~/application/modules/pages/CrudlEntity/components/renderers/CrudlRendererRouter';

export class CrudlRenderer<E extends CrudlEntity<any>> {
  constructor(props?: CrudlRendererProps) {
    if (props?.components?.list) this.list = props.components.list;
    if (props?.components?.read) this.read = props.components.read;
    if (props?.components?.create) this.create = props.components.create;
    if (props?.components?.update) this.update = props.components.update;
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
