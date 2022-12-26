import { FC } from 'react';
import { FeatureInputProps } from '../../../types/field';
declare type IProps = FeatureInputProps & {
    variants: Record<any, any>;
    autocomplete: boolean;
    isLoadingReference?: boolean;
};
declare const SelectInput: FC<IProps>;
export { SelectInput };
