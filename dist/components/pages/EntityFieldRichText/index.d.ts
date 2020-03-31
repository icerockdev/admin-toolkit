import { FC, MouseEventHandler } from 'react';
declare type IProps = {
    label: string;
    value: any;
    isEditing?: boolean;
    handler?: (val: any) => void;
    error?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
} & Record<string, any>;
declare const EntityFieldRichText: FC<IProps>;
export { EntityFieldRichText };
