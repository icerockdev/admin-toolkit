import { FC, MouseEventHandler } from 'react';
declare type IProps = {
    label: string;
    value: any;
    error?: string;
    isEditing?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    handler?: (val: any) => void;
} & Record<string, any>;
declare const EntityFieldString: FC<IProps>;
export { EntityFieldString };
