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
    authPasswUpdateFn: function (token, password, passwordRepeat) {
        return new Promise(function (resolve) {
            console.log('Resetting password with: ', {
                token: token,
                password: password,
                passwordRepeat: passwordRepeat,
            });
            resolve({ error: '' });
        });
    },
    tokenRefreshFn: function (refresh) {
        console.log('Refreshing JWT tokens');
        var seed = Math.random() * 65535;
        return new Promise(function (resolve) {
            return setTimeout(function () {
                return resolve({
                    access: "accessToken_" + seed,
                    refresh: "refreshToken_" + seed,
                });
            }, 3000);
        });
    },
    newPasswordValidator: function (password) {
        return password.length > 5 ? '' : 'Password must be at least 6 symbols long';
    },
});
