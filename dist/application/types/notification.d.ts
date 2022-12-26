export interface INotification {
    show: boolean;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timeout: number;
}
