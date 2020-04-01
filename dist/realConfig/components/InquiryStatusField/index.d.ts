/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from 'react';
import { IEntityField } from '../../../application';
interface InquiryData {
    type: number;
}
interface IProps {
    label: string;
    data: InquiryData;
    value: any;
    fields: IEntityField[];
    error: string;
    options: {
        types: Record<number, number[]>;
        titles: Record<number, string>;
    };
    isEditing?: boolean;
    handler: (val: any) => void;
    withToken: (req: any, args: any) => any;
}
declare const InquiryStatusField: FC<IProps>;
export { InquiryStatusField };
