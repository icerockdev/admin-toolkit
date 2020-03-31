/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

export interface INotification {
    show: boolean;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timeout: number;
}
