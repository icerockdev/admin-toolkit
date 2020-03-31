/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

/// <reference types="react" />
import { INotification } from '../../types/notification';
export declare class Notifications {
    constructor();
    notification: INotification;
    hideNotification: () => void;
    showError: (message: string) => void;
    showSuccess: (message: string) => void;
    get Output(): () => JSX.Element;
}
