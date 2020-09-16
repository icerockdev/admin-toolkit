/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import {
  AUTH_ERRORS,
  EMPTY_USER,
  IAuthProviderProps,
  UNAUTHORIZED,
  WithTokenFunction,
} from '~/application/types/auth';
import { action, computed, flow, observable, reaction } from 'mobx';
import { AuthProvider } from '../AuthProvider';
import { Unwrap } from '~/application/types/common';

const EMPTY_TOKENS = {
  access: '',
  refresh: '',
};

export type IJWTTokenRefreshFn = (
  refresh: string
) => Promise<{
  access: string;
  refresh: string;
}>;

export type IJWTAuthRequestFn = (
  email: string,
  password: string
) => Promise<{
  user: IAuthProviderProps['user'];
  tokens: { access: string; refresh: string };
  error: string;
}>;

export type IJWTAuthProviderProps = IAuthProviderProps & {
  authRequestFn: IJWTAuthRequestFn;
  tokenRefreshFn: IJWTTokenRefreshFn;
};

export class JWTAuthProvider extends AuthProvider {
  @observable tokens: Record<string, string> = EMPTY_TOKENS;
  @observable authRequestFn?: IJWTAuthProviderProps['authRequestFn'];
  @observable tokenRefreshFn?: IJWTAuthProviderProps['tokenRefreshFn'];

  constructor(fields?: Partial<IJWTAuthProviderProps>) {
    super(fields);

    if (this.persist) {
      const { user, tokens } = this.getPersistedCredentials();

      if (user) {
        this.user = user;
      }

      if (tokens) {
        this.tokens = tokens;
      }

      reaction(() => this.tokens, this.persistTokens);
      reaction(() => this.user, this.persistCredentials);
    }
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

  tokenRefreshInstance?: any;

  @action
  withToken: WithTokenFunction = async (req: any, args: any) => {
    return await req({
      ...args,
      token: `Bearer ${this.tokens.access}`,
    })
      .then((result: any) => {
        if (result?.error === UNAUTHORIZED) {
          throw new Error(UNAUTHORIZED);
        }

        return result;
      })
      .catch(async (e: Error) => {
        if (e.message === UNAUTHORIZED && this.tokenRefreshFn) {
          // If there's other updater, wait for it
          if (!this.tokenRefreshInstance) {
            this.tokenRefreshInstance = flow(function* (this: JWTAuthProvider) {
              if (!this.tokenRefreshFn) return { access: '', refresh: '' };

              return yield this.tokenRefreshFn(this.tokens.refresh);
            }).bind(this)();

            const tokens = await this.tokenRefreshInstance;

            this.tokens = {
              access: tokens.access || '',
              refresh: tokens.refresh,
            };

            this.tokenRefreshInstance = null;
          } else {
            await this.tokenRefreshInstance;
          }

          if (this.tokens.access && this.tokens.refresh) {
            return await req({
              ...args,
              token: `Bearer ${this.tokens.access}`,
            });
          }

          this.user = EMPTY_USER;
          this.tokens = EMPTY_TOKENS;
        } else {
          this.parent?.notifications.showError(e.message);
        }
      });
  };

  getPersistedCredentials = (): {
    user?: IAuthProviderProps['user'];
    tokens?: Record<string, string>;
  } => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');

      if (typeof user != 'object') return {};

      return { user, tokens };
    } catch (e) {
      return {};
    }
  };

  persistCredentials = () => {
    localStorage.setItem('user', JSON.stringify(this.user));
  };

  persistTokens = () => {
    localStorage.setItem('tokens', JSON.stringify(this.tokens));
  };

  @computed
  get isLogged() {
    return !!this.tokens.access;
  }
}
