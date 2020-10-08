import { FC, HTMLAttributes } from 'react';
import { ENTITY_SORT_DIRS } from '../..';
declare type IProps = HTMLAttributes<HTMLDivElement> & {
    field: string;
    active?: boolean;
    direction?: typeof ENTITY_SORT_DIRS[keyof typeof ENTITY_SORT_DIRS];
    onSortChange: (field: string) => void;
};
declare const EntityHeadSortable: FC<IProps>;
export { EntityHeadSortable };
