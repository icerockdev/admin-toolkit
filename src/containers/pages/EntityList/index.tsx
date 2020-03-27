/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, createElement } from 'react';
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
} from '@material-ui/core';
import { IEntityField, getEntityFieldRenderer } from '~/application/';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { EntityHeadSortable } from '~/components/pages/EntityHeadSortable';

interface IProps {
  isLoading: boolean;
  fields: IEntityField[];
  data: Record<string, string>[];
  url: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
  canView: boolean;
  canEdit: boolean;
  onSortChange: (field: string) => void;
}

const EntityList: FC<IProps> = ({
  isLoading,
  fields,
  data,
  url,
  sortBy,
  sortDir,
  canView,
  canEdit,
  onSortChange,
}) => {
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
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={fields.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
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
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
};

export { EntityList };
