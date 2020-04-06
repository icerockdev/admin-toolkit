/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

// import React from 'react';
import { EMPTY_USER, IAuthProviderProps } from '~/application/types/auth';
import { computed, observable, action, reaction, toJS } from 'mobx';
import { flow } from 'mobx';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { Config } from '../Config';

export class AuthProvider {
  // From props
  @observable parent?: Config;
  @observable user: IAuthProviderProps['user'] = EMPTY_USER;
  @observable authRequestFn?: IAuthProviderProps['authRequestFn'];
  @observable authPasswRestoreFn?: IAuthProviderProps['authPasswRestoreFn'];
  @observable roleTitles?: Record<any, string>;
  @observable persist?: IAuthProviderProps['persist'] = true;

  constructor(fields?: Partial<IAuthProviderProps>) {
    if (fields) {
      Object.assign(this, fields);
    }

    if (this.persist) {
      const { user } = this.getPersistedCredentials();

      if (user) {
        this.user = { ...EMPTY_USER, ...user };
      }

      reaction(() => this.user, this.persistCredentials);
    }
  }

  // Built-in
  @observable isLoading: boolean = false;
  @observable error: string = '';

  sendAuthRequestInstance?: CancellablePromise<any>;

  @action
  sendAuthRequest = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    this.sendAuthRequestCancel();

    this.sendAuthRequestInstance = flow(function* sendAuthRequest(
      this: AuthProvider
    ) {
      if (!this.authRequestFn) return;

      this.isLoading = true;

      try {
        const response = yield this.authRequestFn(email, password).catch(
          () => null
        );

        if (!response || response.error) {
          throw new Error(response.error);
        }

        this.user = response.user;
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    }).bind(this)();
  };

  sendAuthRequestCancel = () => {
    if (this.sendAuthRequestInstance && this.sendAuthRequestInstance.cancel) {
      this.sendAuthRequestInstance.cancel();
    }
  };

  sendAuthPasswRestoreInstance?: CancellablePromise<any>;

  @action
  sendAuthPasswRestore = ({ email }: { email: string }) => {
    this.sendAuthPasswRestoreCancel();

    this.sendAuthPasswRestoreInstance = flow(function* sendAuthPasswRestore(
      this: AuthProvider
    ) {
      if (!this.authPasswRestoreFn) return;

      this.isLoading = true;

      try {
        const response = yield this.authPasswRestoreFn(email).catch(() => null);

        if (!response || response.error) {
          throw new Error(response.error);
        }

        this.parent?.notifications.showSuccess('Check your email');
        this.parent?.history.push('/');
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    }).bind(this)();
  };

  sendAuthPasswRestoreCancel = () => {
    if (
      this.sendAuthPasswRestoreInstance &&
      this.sendAuthPasswRestoreInstance.cancel
    ) {
      this.sendAuthPasswRestoreInstance.cancel();
    }
  };

  getPersistedCredentials = (): { user?: IAuthProviderProps['user'] } => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (typeof user != 'object') return {};

      return { user };
    } catch (e) {
      return {};
    }
  };

  persistCredentials = () => {
    localStorage.setItem('user', JSON.stringify(this.user));
  };

  @action
  logout = () => {
    this.user = EMPTY_USER;
  };

  @observable
  withToken = (req: any, args: any) => {
    return req({ ...args, token: this.user.token });
  };

  @computed
  get isLogged() {
    return !!this.user.token;
  }
}
