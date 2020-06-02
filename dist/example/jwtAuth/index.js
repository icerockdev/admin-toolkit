/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */
import { JWTAuthProvider } from '../../application';
export default new JWTAuthProvider({
    authRequestFn: function (email, password) {
        return new Promise(function (resolve) {
            console.log('Authenticating with: ', { email: email, password: password });
            resolve({
                user: {
                    email: email,
                    username: email,
                    role: 'user',
                },
                tokens: { access: 'accessToken', refresh: 'refreashToken' },
                error: '',
            });
        });
    },
    authPasswRestoreFn: function (email) {
        return new Promise(function (resolve) {
            console.log('Restoring password with: ', { email: email });
            resolve({ error: '' });
        });
    },
    tokenRefreshFn: function (refresh) {
        return Promise.resolve({ access: 'accessToken', refresh: 'refreshToken' });
    },
});
