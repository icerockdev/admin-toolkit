import { FC } from 'react';
import { FeatureField } from '../../../fields/FeatureField';
interface IProps {
    fields: FeatureField[];
    selected: string[];
    onSelect: (name: string) => void;
}
declare const FilterSelector: FC<IProps>;
export { FilterSelector };
