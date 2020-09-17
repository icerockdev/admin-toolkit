import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react';
import { TextField } from '@material-ui/core';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useFeature } from '~/utils/hooks';
import { Placeholder } from '~/application/modules/pages/Feature/components/common/Placeholder';

interface IProps {
  value: string;
  label: string;
  onChange: (val: string) => void;
}

const StringInput: FC<IProps> = observer(({ value, label, onChange }) => {
  const feature = useFeature();
  const handler = useCallback(console.log, [onChange]);

  return (
    <Placeholder isLoading={feature.data.isLoading} width="100%" height="56px">
      <TextField
        value={value}
        onChange={handler}
        variant="outlined"
        label={label}
        className={classNames(
          styles.input,
          'feature-read__input feature-read__input_string'
        )}
      />
    </Placeholder>
  );
});

export { StringInput };
