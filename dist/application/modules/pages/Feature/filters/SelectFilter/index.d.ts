import { FC } from 'react';
import { FeatureFilterComponentProps } from '../../types/filters';
declare type IProps = FeatureFilterComponentProps & {
    variants: Record<any, any>;
    autocomplete: boolean;
};
declare const SelectFilter: FC<IProps>;
export { SelectFilter };
