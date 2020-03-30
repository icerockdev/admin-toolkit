/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React from 'react';
import { observable, action, reaction, computed } from 'mobx';
import { INotification } from '~/application/types/notification';
import { observer } from 'mobx-react';
import { Notification } from '~/containers/login/Notification';

export class Notifications {
  constructor() {
    reaction(
      () => this.notification.message,
      () => console.log(this.notification.message)
    );
  }

  @observable notification: INotification = {
    show: false,
    message: '',
    type: 'info',
    timeout: 6000,
  };

  @action
  hideNotification = () => {
    this.notification.show = false;
  };

  @action
  showError = (message: INotification['message']) => {
    console.log('INSIDE', message);
    this.notification.show = true;
    this.notification.message = message;
    this.notification.type = 'error';
  };

  @action
  showSuccess = (message: INotification['message']) => {
    this.notification.show = true;
    this.notification.message = message;
    this.notification.type = 'success';
  };

  @computed
  get Output() {
    return observer(() => (
      <Notification
        hideNotification={this.hideNotification}
        message={this.notification.message}
        type={this.notification.type}
        timeout={this.notification.timeout}
        show={this.notification.show}
      />
    ));
  }
}
