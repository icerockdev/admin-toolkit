/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import {
  AuthProviderOptions,
  AuthProviderUser,
  EMPTY_USER,
  UNAUTHORIZED,
  WithTokenFunction,
} from '~/application/types/auth';
import { action, computed, flow, observable, reaction } from 'mobx';
import { CancellablePromise } from 'mobx/lib/api/flow';
import { Config } from '../../config/Config';
import { AuthRouter } from '~/containers/login/AuthRouter';
import { FC } from 'react';
import { AuthVerticalLayout } from '~/application/layouts/login/AuthVerticalLayout';
import { has } from 'ramda';

export class AuthProvider {
  constructor(options?: Partial<AuthProviderOptions>) {
    if (options) {
      Object.assign(this, options);
    }

    if (this.persist) {
      const { user } = this.getPersistedCredentials();

      if (user) {
        this.user = { ...EMPTY_USER, ...user };
      }

      reaction(() => this.user, this.persistCredentials);
    }
  }

  // From props
  @observable splash: string = '';
  @observable layout: FC = AuthVerticalLayout;
  @observable parent?: Config;
  @observable user: AuthProviderUser = EMPTY_USER;
  @observable authRequestFn?: AuthProviderOptions['authRequestFn'];
  @observable authPasswRestoreFn?: AuthProviderOptions['authPasswRestoreFn'];
  @observable authPasswUpdateFn?: AuthProviderOptions['authPasswUpdateFn'];
  @observable roleTitles?: Record<any, string>;
  @observable persist?: AuthProviderOptions['persist'] = true;
  @observable passwordValidator?: AuthProviderOptions['passwordValidator'];
  @observable router: FC = AuthRouter;

  @observable getUserName: AuthProviderOptions['getUserName'] = () =>
    this.user.username || '';

  @observable
  getUserRoleTitle: AuthProviderOptions['getUserRoleTitle'] = () => {
    const role = this.user.role;
    if (!role) return '';
    if (role && this.roleTitles && has(role, this.roleTitles))
      return this.roleTitles[role];
    return role || '';
  };

  // Built-in
  @observable isLoading: boolean = false;
  @observable error: string = '';

  @computed
  get userName() {
    return this.getUserName(this);
  }

  @computed
  get userRole() {
    return this.getUserRoleTitle(this);
  }

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
        this.parent?.notifications.showError(e.toString());
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
        this.parent?.notifications.showError(e.toString());
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
      try {
        this.sendAuthPasswRestoreInstance.cancel();
      } catch (e) {}
    }
  };

  sendAuthPasswUpdateInstance?: CancellablePromise<any>;

  @action
  sendAuthPasswUpdate = ({
    token,
    password,
    passwordRepeat,
  }: {
    token: string;
    password: string;
    passwordRepeat: string;
  }) => {
    this.sendAuthPasswRestoreCancel();

    this.sendAuthPasswUpdateInstance = flow(function* sendAuthPasswUpdate(
      this: AuthProvider
    ) {
      if (!this.authPasswUpdateFn) return;

      this.isLoading = true;

      try {
        if (!token.trim()) {
          throw new Error(`Token is empty`);
        }

        if (password !== passwordRepeat) {
          throw new Error(`Passwords doesn't match`);
        }

        if (this.passwordValidator && this.passwordValidator(password)) {
          throw new Error(this.passwordValidator(password));
        }

        const response = yield this.authPasswUpdateFn(
          token,
          password,
          passwordRepeat
        ).catch(() => null);

        if (!response || response.error) {
          throw new Error(response.error);
        }

        this.parent?.notifications.showSuccess('You can now log in');
        this.parent?.history.push('/');
      } catch (e) {
        this.error = e;
        this.parent?.notifications.showError(e.toString());
      } finally {
        this.isLoading = false;
      }
    }).bind(this)();
  };

  sendAuthPasswUpdateCancel = () => {
    if (
      this.sendAuthPasswUpdateInstance &&
      this.sendAuthPasswUpdateInstance.cancel
    ) {
      try {
        this.sendAuthPasswUpdateInstance.cancel();
      } catch (e) {}
    }
  };

  getPersistedCredentials = (): { user?: AuthProviderUser } => {
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

  /**
   * Passes token variable to {args}
   * @param req - request function
   * @param args - args object, that'll be extended with token
   */
  @action
  withToken: WithTokenFunction = async (req: any, args: any) => {
    try {
      const result = await req({ ...args, token: this.user.token });

      if (result.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (e) {
      if (e.toString() === UNAUTHORIZED) {
        this.user = EMPTY_USER;
      }

      this.parent?.notifications.showError(e.toString());
    }
  };

  @computed
  get isLogged() {
    return !!this.user.token;
  }

  @computed
  get output() {
    return this.router;
  }
}
