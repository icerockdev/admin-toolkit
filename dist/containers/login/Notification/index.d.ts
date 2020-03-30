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
