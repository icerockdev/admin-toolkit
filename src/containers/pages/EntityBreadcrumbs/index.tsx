import React, { useMemo, ReactElement } from 'react';
import {
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  Button,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import styles from './styles';
import { IEntityField } from '~/application';
import { observer } from 'mobx-react';

type IProps = WithStyles<typeof styles> & {
  id?: string;
  name: string;
  url: string;
  isEditing?: boolean;
  isCreating?: boolean;
  fields: IEntityField[];
  data: Record<string, any>;
  buttons?: ReactElement;
};

const EntityBreadcrumbs = withStyles(styles)(
  observer(
    ({
      name,
      url,
      isEditing,
      isCreating,
      classes,
      id,
      fields,
      data,
      buttons,
    }: IProps) => {
      const title = useMemo(() => {
        const field = fields.find((f) => f.title);
        return data && field && field.name ? data[field.name] : id;
      }, [data, fields, id]);

      return (
        <div className={classes.breadcrumbs}>
          <Grid container alignItems="center">
            <Grid style={{ flex: 1 }}>
              <Breadcrumbs aria-label="breadcrumb">
                {name && (
                  <Link color="inherit" to={url} component={RouterLink}>
                    {name}
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

                {!!isEditing && !isCreating && (
                  <Typography color="textPrimary">Редактирование</Typography>
                )}

                {!!isEditing && isCreating && (
                  <Typography color="textPrimary">Создание</Typography>
                )}
              </Breadcrumbs>
            </Grid>

            {buttons}

            {!isEditing && !isCreating && (
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
      );
    }
  )
);

export { EntityBreadcrumbs };
