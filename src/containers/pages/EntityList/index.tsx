/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { createElement, useMemo } from 'react';
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
import {
  IEntityField,
  getEntityFieldRenderer,
  ENTITY_SORT_DIRS,
} from '~/application/';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { EntityHeadSortable } from '~/components/pages/EntityHeadSortable';
import styles from './styles';
import { EntityField } from '../../../application/components/EntityField';

type IProps = WithStyles<typeof styles> & {
  isLoading: boolean;
  fields: IEntityField[];
  data: Record<string, string>[];
  url: string;
  sortBy: string;
  sortDir: typeof ENTITY_SORT_DIRS[keyof typeof ENTITY_SORT_DIRS];
  canView: boolean;
  canEdit: boolean;
  onSortChange: (field: string) => void;
  withToken?: (req: any, args: any) => any;
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
    withToken,
    canView,
    canEdit,
    onSortChange,
  }: IProps) => {
    const visibleFields = useMemo(
      () => fields.filter((field) => !field.hideInList),
      [fields]
    );

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
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {visibleFields.map((field) =>
                  field.sortable ? (
                    <EntityHeadSortable
                      active={sortBy === field.name}
                      direction={sortDir}
                      key={field.name}
                      field={field.name}
                      onSortChange={onSortChange}
                    >
                      <b>{field.label || field.name}</b>
                    </EntityHeadSortable>
                  ) : (
                    <TableCell key={field.name}>
                      <b>{field.label || field.name}</b>
                    </TableCell>
                  )
                )}
                {(canView || canEdit) && <TableCell />}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((entry, i) => (
                <TableRow key={i}>
                  {visibleFields.map((field) => (
                    <TableCell key={field.name}>
                      <EntityField
                        name={field.name}
                        fields={fields}
                        data={entry}
                      />
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
