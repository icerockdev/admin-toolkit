/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

export declare type FeatureFilterComponentProps = {
    label: string;
    name: string;
    value: any;
    onChange: (val: any) => void;
    onReset: () => void;
    disabled?: boolean;
    inline?: boolean;
};
