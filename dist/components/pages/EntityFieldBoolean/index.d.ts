import { FC, MouseEventHandler } from 'react';
declare type IProps = {
    value: any;
    isEditing?: boolean;
    handler?: (val: any) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
} & Record<string, any>;
declare const EntityFieldBoolean: FC<IProps>;
export { EntityFieldBoolean };
