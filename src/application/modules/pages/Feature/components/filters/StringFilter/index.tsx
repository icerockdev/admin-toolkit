import React, { FC } from 'react';
import { FeatureFilterComponentProps } from '~/application/modules/pages/Feature/types/filters';
import styles from './styles.module.scss';
import { FilterWrapper } from '~/application/modules/pages/Feature/filters/FilterWrapper';
import { StringInput } from '~/application/modules/pages/Feature/components/inputs/StringInput';

const StringFilter: FC<FeatureFilterComponentProps> = ({
  label,
  name,
  value,
  onChange,
  onReset,
  inline,
}) => {
  return (
    <FilterWrapper onClear={onReset} inline={inline}>
      <div className={styles.input}>
        <StringInput
          label={inline ? '' : label}
          onChange={onChange}
          value={value}
        />
      </div>
    </FilterWrapper>
  );
};

export { StringFilter };
