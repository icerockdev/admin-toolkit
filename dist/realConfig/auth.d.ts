/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

export declare const authRequestFn: (host: string) => (email: string, password: string) => Promise<{
    user: {
        id?: number | undefined;
        email?: string | undefined;
        username?: string | undefined;
        role?: string | undefined;
        token?: string | undefined;
    };
    tokens: Record<string, string>;
    error: string;
}>;
export declare const authPasswRestoreFn: (host: string) => (email: string) => Promise<{
    error: string;
}>;
