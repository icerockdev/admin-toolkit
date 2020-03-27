/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

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
