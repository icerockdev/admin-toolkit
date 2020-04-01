/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

// import React from 'react';
import {
  EMPTY_USER,
  IAuthProviderProps,
  AUTH_ERRORS,
} from '~/application/types/auth';
import { computed, observable, action } from 'mobx';
import { flow } from 'mobx';
import { AuthProvider } from '../AuthProvider';
import { Unwrap } from '~/application/types/common';

const EMPTY_TOKENS = {
  access: '',
  refresh: '',
};

export class JWTAuthProvider extends AuthProvider {
  @observable tokens: Record<string, string> = EMPTY_TOKENS;
  @observable authRequestFn?: (
    email: string,
    password: string
  ) => Promise<{
    user: IAuthProviderProps['user'];
    tokens: Record<string, string>;
    error: string;
  }>;

  constructor(fields?: Partial<IAuthProviderProps>) {
    super(fields);
  }

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
      this: JWTAuthProvider
    ) {
      if (!this.authRequestFn) return;

      this.isLoading = true;

      try {
        const response: Unwrap<typeof this.authRequestFn> = yield this.authRequestFn(
          email,
          password
        );

        if (!response || response.error) {
          this.parent?.notifications.showError(
            response?.error || AUTH_ERRORS.CANT_LOGIN
          );
          throw new Error(response?.error);
        }

        this.parent?.notifications.hideNotification();
        this.user = response.user;
        this.tokens = response.tokens;
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

  @action
  logout = () => {
    this.user = EMPTY_USER;
    this.tokens = EMPTY_TOKENS;
  };

  @observable
  withToken = async (req: any, args: any) => {
    return req({ ...args, token: `Bearer ${this.tokens.access}` });
  };

  @computed
  get isLogged() {
    return !!this.tokens.access;
  }
}
