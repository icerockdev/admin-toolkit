/* Copyright (c) 2020-2022 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { IPageProps } from '~/application/types/page';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import styles from './styles.module.scss';

export class Page {
  @observable title: IPageProps['title'] = 'Admin Toolkit';
  @observable menu: IPageProps['menu'] = {
    enabled: true,
    label: '',
    url: '',
    childFields: undefined,
  };
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
      !this.parent?.auth ||
      (this.parent?.auth?.user?.role &&
        this.roles?.includes(this.parent.auth?.user?.role))
    );
  }

  @computed
  get output() {
    return observer(() => (
      <div>
        <h1>{this.title}</h1>
        <p>You can override this class to make your own cool entity</p>
      </div>
    ));
  }

  get forbiddenPlaceholder() {
    return (
      <div className={styles.wrap}>
        <div className={styles.error}>
          <h1>Forbidden</h1>
          <p>You don't have permission to perform that action</p>
        </div>
      </div>
    );
  }
}
