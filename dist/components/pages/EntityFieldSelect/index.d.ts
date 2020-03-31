import { FC, MouseEventHandler } from 'react';
declare type IProps = {
    label: string;
    value: any;
    isEditing?: boolean;
    handler?: (val: any) => void;
    error?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    availableVariants?: Record<any, any>;
} & Record<string, any>;
declare const EntityFieldSelect: FC<IProps>;
export { EntityFieldSelect };
