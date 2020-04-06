import { FC, MouseEventHandler } from 'react';
declare type IProps = {
    label: string;
    value: any;
    error?: string;
    isEditing?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    handler?: (val: any) => void;
    options?: {
        accuracy?: number;
    };
} & Record<string, any>;
declare const EntityFieldNumber: FC<IProps>;
export { EntityFieldNumber };
