/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { createElement } from 'react';
import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  CircularProgress,
  Button,
  ButtonGroup,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { IEntityField, getEntityFieldRenderer } from '~/application/';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { EntityHeadSortable } from '~/components/pages/EntityHeadSortable';
import styles from './styles';

type IProps = WithStyles<typeof styles> & {
  isLoading: boolean;
  fields: IEntityField[];
  data: Record<string, string>[];
  url: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
  canView: boolean;
  canEdit: boolean;
  onSortChange: (field: string) => void;
};

const EntityList = withStyles(styles)(
  ({
    classes,
    isLoading,
    fields,
    data,
    url,
    sortBy,
    sortDir,
    canView,
    canEdit,
    onSortChange,
  }: IProps) => {
    if (isLoading) {
      return (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {fields.map((field) =>
                  field.sortable ? (
                    <EntityHeadSortable
                      active={sortBy === field.name}
                      direction={sortDir}
                      key={field.name}
                      field={field.name}
                      onSortChange={onSortChange}
                    >
                      <span>{field.label || field.name}</span>
                    </EntityHeadSortable>
                  ) : (
                    <TableCell key={field.name}>
                      {field.label || field.name}
                    </TableCell>
                  )
                )}
                {(canView || canEdit) && <TableCell />}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((entry, i) => (
                <TableRow key={i}>
                  {fields.map((field) => (
                    <TableCell key={field.name}>
                      {createElement(
                        getEntityFieldRenderer(
                          field.type || typeof entry[field.name]
                        ),
                        {
                          value: entry[field.name],
                        }
                      )}
                    </TableCell>
                  ))}
                  {(canEdit || canView) && (
                    <TableCell size="small" align="right">
                      <ButtonGroup variant="text">
                        {canEdit && (
                          <Button
                            to={`${url}/${entry.id}/edit`}
                            component={RouterLink}
                          >
                            <EditIcon />
                          </Button>
                        )}
                        {canView && (
                          <Button
                            to={`${url}/${entry.id}/`}
                            component={RouterLink}
                          >
                            <VisibilityIcon />
                          </Button>
                        )}
                      </ButtonGroup>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
);

export { EntityList };
