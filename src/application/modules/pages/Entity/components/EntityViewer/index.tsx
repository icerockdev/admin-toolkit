/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import styles from './styles';
import { EntityField, IEntityField } from '~/application';
import { observer } from 'mobx-react';
import { Entity } from '~/application/modules';
import { useTranslation } from 'react-i18next';

type IProps = WithStyles<typeof styles> & {
  url: string;
  id?: string;
  fields: IEntityField[];
  errors: Record<string, string>;
  isEditing: boolean;
  isLoading: boolean;
  data: Record<string, any>;
  viewable: boolean;
  entity: Entity;

  setEditorData: (data: Record<string, any>) => void;
  getItem: (id: any) => void;
  cancelGetItem: () => void;
  onSave: () => void;
  onCancel: () => void;
  onResetFieldError: (field: string) => void;
  withToken?: (req: any, args: any) => any;
};

const EntityViewer = withStyles(styles)(
  observer(
    ({
      classes,
      id,
      fields,
      errors,
      onSave,
      onCancel,
      onResetFieldError,
      isLoading,
      data,
      setEditorData,
      getItem,
      cancelGetItem,
      withToken,
      isEditing,
      entity,
    }: IProps) => {
      const { t } = useTranslation();
      const isCreating = useMemo(() => typeof id === 'undefined', [id]);

      const visibleFields = useMemo(
        () =>
          fields.filter(
            (field) =>
              (isEditing && !isCreating && !field.hideInEdit) ||
              (isCreating && !field.hideInCreate) ||
              (!isEditing && !isCreating && !field.hideInView)
          ),
        [fields, isEditing, isCreating]
      );

      const onFieldChange = useCallback(
        (f) => (value: any) => {
          if (errors[f]) {
            onResetFieldError(f);
          }

          setEditorData({ ...data, [f]: value });
        },
        [errors, setEditorData, data, onResetFieldError]
      );

      const onSubmit = useCallback(
        (event) => {
          event.preventDefault();
          onSave();
        },
        [onSave]
      );

      useEffect(() => {
        getItem(id);
        return () => cancelGetItem();
      }, [cancelGetItem, getItem, id]);

      if (isLoading) {
        return (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        );
      }

      return (
        <div className={classes.wrap}>
          {data && (
            <form onSubmit={onSubmit}>
              <Paper>
                <div className={classes.grid} style={{ flexWrap: 'wrap' }}>
                  {visibleFields.map((field) => (
                    <div className={classes.field} key={field.name}>
                      {!isEditing && (
                        <div className="label">
                          {field.label
                            ? t(`fields:${field.label}`)
                            : field.name}
                          {isEditing && field.required && <span>{` *`}</span>}
                        </div>
                      )}
                      <div className="field">
                        <EntityField
                          name={field.name}
                          data={data}
                          fields={fields}
                          isEditing={isEditing}
                          error={errors[field.name]}
                          handler={onFieldChange(field.name)}
                          withToken={withToken}
                          entity={entity}
                        />
                      </div>
                    </div>
                  ))}

                  {isEditing && (
                    <div className={`${classes.field} ${classes.buttons}`}>
                      <Grid container spacing={1}>
                        <Grid item style={{ flex: 1 }} />

                        <Grid item>
                          <Button
                            type="button"
                            color="default"
                            variant="outlined"
                            onClick={onCancel}
                          >
                            {t('buttons:Cancel')}
                          </Button>
                        </Grid>

                        <Grid item>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            {t('buttons:Save')}
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                </div>
              </Paper>
            </form>
          )}
        </div>
      );
    }
  )
);

export { EntityViewer };
