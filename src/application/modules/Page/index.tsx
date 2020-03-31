/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { IPageProps } from '~/application/types/page';
import { observable, computed, action, toJS } from 'mobx';
import { observer } from 'mobx-react';

export class Page {
  @observable title: IPageProps['title'] = '';
  @observable menu: IPageProps['menu'] = { enabled: true, label: '', url: '' };
  @observable parent?: IPageProps['parent'];
  @observable roles?: IPageProps['roles'];

  constructor(fields?: Partial<IPageProps>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  @action
  onMount: (page: Page) => void = () => {};

  @action
  onUnmount: (page: Page) => void = () => {};

  @computed
  get canList() {
    return !!(
      !this.roles ||
      (this.parent?.auth?.user?.role &&
        (this.roles?.all?.includes(this.parent.auth?.user?.role.toString()) ||
          this.roles?.list?.includes(this.parent.auth?.user?.role.toString())))
    );
  }

  @computed
  get canEdit() {
    return !!(
      !this.roles ||
      (this.parent?.auth?.user?.role &&
        (this.roles?.all?.includes(this.parent.auth?.user?.role.toString()) ||
          this.roles?.update?.includes(
            this.parent.auth?.user?.role.toString()
          )))
    );
  }

  @computed
  get canCreate() {
    return !!(
      !this.roles ||
      (this.parent?.auth?.user?.role &&
        (this.roles?.all?.includes(this.parent.auth?.user?.role.toString()) ||
          this.roles?.create?.includes(
            this.parent.auth?.user?.role.toString()
          )))
    );
  }

  @computed
  get output() {
    return observer(() => (
      <div>
        <h1>{this.title}</h1>
        <div>You can override this class to make your own cool entity</div>
      </div>
    ));
  }
}
