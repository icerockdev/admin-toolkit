import { FC } from 'react';
import { IEntityField } from '../../../application';
interface IProps {
    isLoading: boolean;
    fields: IEntityField[];
    data: Record<string, string>[];
    url: string;
    sortBy: string;
    sortDir: 'asc' | 'desc';
    canView: boolean;
    canEdit: boolean;
    onSortChange: (field: string) => void;
}
declare const EntityList: FC<IProps>;
export { EntityList };
