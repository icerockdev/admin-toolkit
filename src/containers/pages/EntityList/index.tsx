/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { useMemo, useCallback } from 'react';
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
  Checkbox,
} from '@material-ui/core';
import { IEntityField, ENTITY_SORT_DIRS } from '~/application/';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { EntityHeadSortable } from '~/components/pages/EntityHeadSortable';
import styles from './styles';
import { EntityField } from '../../../application/components/EntityField';
import { useHistory } from 'react-router-dom';

type IProps = WithStyles<typeof styles> & {
  isLoading: boolean;
  fields: IEntityField[];
  data: Record<string, string>[];
  url: string;
  sortBy: string;
  sortDir: typeof ENTITY_SORT_DIRS[keyof typeof ENTITY_SORT_DIRS];
  selected: any[];
  canView: boolean;
  canEdit: boolean;
  canSelect?: boolean;
  setSelected: (items: any[]) => void;
  onSortChange: (field: string) => void;
  withToken?: (req: any, args: any) => void;
};

const EntityList = withStyles(styles)(
  ({
    classes,
    isLoading,
    fields,
    data,
    url,
    selected,
    sortBy,
    sortDir,
    canView,
    canEdit,
    canSelect,
    onSortChange,
    setSelected,
    withToken,
  }: IProps) => {
    const visibleFields = useMemo(
      () => fields.filter((field) => !field.hideInList),
      [fields]
    );

    const history = useHistory();

    const onRowClick = useCallback(
      (id: any) => {
        if (canView) {
          return history.push(`${url}/${id}`);
        }

        if (canEdit) {
          return history.push(`${url}/${id}/edit`);
        }
      },
      [canView, canEdit, history, url]
    );

    const onSelect = useCallback(
      (id: any, includes: boolean) => {
        setSelected(
          !includes ? selected.filter((el) => el !== id) : [...selected, id]
        );
      },
      [selected, setSelected]
    );

    const isAllSelected = useMemo(() => selected.length === data.length, [
      data,
      selected,
    ]);

    const onSelectAll = useCallback(() => {
      setSelected(isAllSelected ? [] : data.map((el) => el.id));
    }, [selected, setSelected, isAllSelected, data]);

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
                {canSelect && (
                  <TableCell>
                    <Checkbox onChange={onSelectAll} checked={isAllSelected} />
                  </TableCell>
                )}
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
                <TableRow key={i} hover>
                  {canSelect && (
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(entry.id)}
                        onChange={(_, includes) => onSelect(entry.id, includes)}
                      />
                    </TableCell>
                  )}

                  {visibleFields.map((field) => (
                    <TableCell
                      key={field.name}
                      onClick={() => onRowClick(entry.id)}
                    >
                      <EntityField
                        name={field.name}
                        fields={fields}
                        data={entry}
                        withToken={withToken}
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
