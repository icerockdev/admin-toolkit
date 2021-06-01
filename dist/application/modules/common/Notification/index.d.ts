/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { INotification } from '../../../types/notification';
export declare class Notifications {
    notification: INotification;
    hideNotification: () => void;
    showError: (message: INotification['message']) => void;
    showSuccess: (message: INotification['message']) => void;
    get Output(): () => JSX.Element;
}
