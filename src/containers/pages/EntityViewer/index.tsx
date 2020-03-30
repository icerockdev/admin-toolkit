/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { useMemo, createElement, useEffect, useCallback } from 'react';

import {
  Breadcrumbs,
  Typography,
  withStyles,
  WithStyles,
  Link,
  Paper,
  Grid,
  Button,
  CircularProgress,
} from '@material-ui/core';

import styles from './styles';
import { IEntityField, getEntityFieldRenderer } from '~/application';
import { observer } from 'mobx-react';
import { Link as RouterLink } from 'react-router-dom';

type IProps = WithStyles<typeof styles> & {
  url: string;
  entityName: string;
  id?: string;
  fields: IEntityField[];
  errors: Record<string, string>;
  isEditing: boolean;
  isLoading: boolean;
  data: Record<string, any>;

  setEditorData: (data: Record<string, any>) => void;
  getItem: (id: any) => void;
  cancelGetItem: () => void;
  onSave: () => void;
  onResetFieldError: (field: string) => void;
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
      entityName,
      onSave,
      onResetFieldError,
      isLoading,
      data,
      setEditorData,
      getItem,
      cancelGetItem,
    }: IProps) => {
      const isCreating = useMemo(() => typeof id === 'undefined', [id]);

      const title = useMemo(() => {
        const field = fields.find((f) => f.title);
        return data && field && field.name ? data[field.name] : id;
      }, [data, fields, id]);

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
          <div className={classes.breadcrumbs}>
            <Grid container alignItems="center">
              <Grid style={{ flex: 1 }}>
                <Breadcrumbs aria-label="breadcrumb">
                  {entityName && (
                    <Link color="inherit" to={url} component={RouterLink}>
                      {entityName}
                    </Link>
                  )}

                  {isEditing && !isCreating && !!title && (
                    <Link
                      color="inherit"
                      to={`${url}/${id}`}
                      component={RouterLink}
                    >
                      {title}
                    </Link>
                  )}

                  {!isEditing && !isCreating && (
                    <Typography color="textPrimary">{title}</Typography>
                  )}

                  {isEditing && !isCreating && (
                    <Typography color="textPrimary">Редактирование</Typography>
                  )}

                  {isEditing && isCreating && (
                    <Typography color="textPrimary">Создание</Typography>
                  )}
                </Breadcrumbs>
              </Grid>

              {!isEditing && (
                <Button
                  to={`${url}/${id}/edit`}
                  component={RouterLink}
                  variant="contained"
                  color="primary"
                  type="button"
                >
                  Редактировать
                </Button>
              )}
            </Grid>
          </div>

          {data && (
            <form onSubmit={onSubmit}>
              <Paper>
                {visibleFields.map((field) => (
                  <div className={classes.field} key={field.name}>
                    <div className="label">
                      {field.label || field.name}
                      {isEditing && field.required && <span>{` *`}</span>}
                    </div>
                    <div className="field">
                      {createElement(
                        getEntityFieldRenderer(
                          field.type || typeof data[field.name]
                        ),
                        {
                          value: Object.prototype.hasOwnProperty.call(
                            data,
                            field.name
                          )
                            ? data[field.name]
                            : null,
                          error: errors[field.name],
                          isEditing,
                          handler: onFieldChange(field.name),
                        }
                      )}
                    </div>
                  </div>
                ))}

                {isEditing && (
                  <div className={classes.field}>
                    <Grid container spacing={1}>
                      <Grid item style={{ flex: 1 }} />

                      <Grid item>
                        <Button
                          type="submit"
                          color="default"
                          variant="outlined"
                          to={isCreating ? url : `${url}/${id}`}
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
              </Paper>
            </form>
          )}
        </div>
      );
    }
  )
);

export { EntityViewer };
