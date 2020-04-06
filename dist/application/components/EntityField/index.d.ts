import { FC } from 'react';
import { IEntityField } from '../..';
interface IProps {
    name: string;
    fields: IEntityField[];
    data?: Record<string, any>;
    error?: string;
    isEditing?: boolean;
    handler?: (val: any) => void;
    withToken?: (req: any, args: any) => void;
}
declare const EntityField: FC<IProps>;
export { EntityField };
