import React, { FC, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { FeatureField } from '~/application/modules/pages/Feature/fields/FeatureField';
import { Button, ListItemText, Menu, MenuItem } from '@material-ui/core';
import FilterIcon from '@material-ui/icons/FilterList';
import styles from './styles.module.scss';

interface IProps {
  fields: FeatureField[];
  selected: string[];
  onSelect: (name: string) => void;
}

const FilterSelector: FC<IProps> = observer(
  ({ fields, selected, onSelect }) => {
    const [buttonRef, setButtonRef] = useState<any>(null);

    const onMenuOpen = useCallback((event) => setButtonRef(event.target), [
      setButtonRef,
    ]);

    const onMenuClose = useCallback((event) => setButtonRef(null), [
      setButtonRef,
    ]);

    const onFieldSelect = useCallback(
      (name: string) => {
        onSelect(name);
        setButtonRef(null);
      },
      [onSelect, setButtonRef]
    );

    const selectable = useMemo(
      () => fields.filter((field) => !selected.includes(field.name)),
      [fields, selected]
    );

    return (
      <>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="outlined"
          color="primary"
          onClick={onMenuOpen}
          className={styles.button}
          disabled={!selectable.length}
        >
          <FilterIcon />
        </Button>

        {buttonRef && (
          <Menu
            id="customized-menu"
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={buttonRef}
            onClose={onMenuClose}
            open={!!buttonRef}
          >
            {selectable.map((field) => (
              <MenuItem
                key={field.name}
                onClick={() => onFieldSelect(field.name)}
              >
                <ListItemText primary={field.label} />
              </MenuItem>
            ))}
          </Menu>
        )}
      </>
    );
  }
);

export { FilterSelector };
