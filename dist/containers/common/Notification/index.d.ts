/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from 'react';
import { INotification } from '../../../application/types/notification';
interface IProps {
    hideNotification: () => void;
    show: INotification['show'];
    type: INotification['type'];
    message: INotification['message'];
    timeout: INotification['timeout'];
}
declare const Notification: FC<IProps>;
export { Notification };
