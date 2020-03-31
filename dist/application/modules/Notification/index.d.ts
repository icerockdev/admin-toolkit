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
