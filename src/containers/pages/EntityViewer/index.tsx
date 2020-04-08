/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { useMemo, useEffect, useCallback } from 'react';

import {
  withStyles,
  WithStyles,
  Paper,
  Grid,
  Button,
  CircularProgress,
} from '@material-ui/core';

import styles from './styles';
import { IEntityField, getEntityFieldRenderer } from '~/application';
import { observer } from 'mobx-react';
import { Link as RouterLink } from 'react-router-dom';
import { EntityField } from '../../../application/components/EntityField';

type IProps = WithStyles<typeof styles> & {
  url: string;
  id?: string;
  fields: IEntityField[];
  errors: Record<string, string>;
  isEditing: boolean;
  isLoading: boolean;
  data: Record<string, any>;
  viewable: boolean;

  setEditorData: (data: Record<string, any>) => void;
  getItem: (id: any) => void;
  cancelGetItem: () => void;
  onSave: () => void;
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
      url,
      isEditing,
      onSave,
      onResetFieldError,
      viewable,
      isLoading,
      data,
      setEditorData,
      getItem,
      cancelGetItem,
      withToken,
    }: IProps) => {
      const isCreating = useMemo(() => typeof id === 'undefined', [id]);

      const visibleFields = useMemo(
        () => fields.filter((field) => !field.hideInEdit),
        [fields]
      );

      const onFieldChange = useCallback(
        (f) => (value: any) => {
          if (errors[f]) {
            onResetFieldError(f);
          }

          setEditorData({ ...data, [f]: value });
        },
        [data, setEditorData, errors]
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
      }, [id]);

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
                          {field.label || field.name}
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
                            type="submit"
                            color="default"
                            variant="outlined"
                            to={isCreating || !viewable ? url : `${url}/${id}`}
                            component={RouterLink}
                          >
                            Отмена
                          </Button>
                        </Grid>

                        <Grid item>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Сохранить
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
