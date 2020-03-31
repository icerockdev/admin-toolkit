import { FC } from 'react';
interface IProps {
    itemsPerPage: number[];
    items: number;
    totalCount: number;
    page: number;
    setPage: (count: number) => void;
    setPerPage: (count: number) => void;
}
declare const EntityFooter: FC<IProps>;
export { EntityFooter };
