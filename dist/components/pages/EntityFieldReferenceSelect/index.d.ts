import { FC, MouseEventHandler } from 'react';
declare type IProps = {
    label: string;
    value: any;
    error?: string;
    isEditing?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    options: Record<string, any>;
    handler?: (val: any) => void;
} & Record<string, any>;
declare const EntityFieldReferenceSelect: FC<IProps>;
export { EntityFieldReferenceSelect };
