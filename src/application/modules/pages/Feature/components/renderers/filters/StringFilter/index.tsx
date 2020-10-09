import React, { FC } from 'react';
import { FeatureFilterComponentProps } from '~/application/modules/pages/Feature/types/filters';
import styles from './styles.module.scss';
import { FilterWrapper } from '~/application/modules/pages/Feature/components/filters/FilterWrapper';
import { StringInput } from '~/application/modules/pages/Feature/components/inputs/StringInput';

const StringFilter: FC<FeatureFilterComponentProps> = ({
  label,
  name,
  value,
  onChange,
  onReset,
}) => {
  return (
    <FilterWrapper onClear={onReset}>
      <div className={styles.input}>
        <StringInput label={label} onChange={onChange} value={value} />
      </div>
    </FilterWrapper>
  );
};

export { StringFilter };
