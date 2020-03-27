/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { IAuthProviderProps } from '../../types/auth';
import { CancellablePromise } from 'mobx/lib/api/flow';
export declare class AuthProvider {
    user: IAuthProviderProps['user'];
    authRequestFn: IAuthProviderProps['authRequestFn'];
    constructor(fields?: Partial<IAuthProviderProps>);
    isLoading: boolean;
    error: string;
    sendAuthRequestInstance?: CancellablePromise<any>;
    sendAuthRequest: ({ email, password, }: {
        email: string;
        password: string;
    }) => void;
    sendAuthRequestCancel: () => void;
    logout: () => void;
    withToken: (req: any, args: any) => any;
    get isLogged(): boolean;
}
