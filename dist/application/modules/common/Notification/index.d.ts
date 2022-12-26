import { INotification } from '../../../types/notification';
export declare class Notifications {
    notification: INotification;
    hideNotification: () => void;
    showError: (message: INotification['message']) => void;
    showSuccess: (message: INotification['message']) => void;
    get Output(): () => JSX.Element;
}
