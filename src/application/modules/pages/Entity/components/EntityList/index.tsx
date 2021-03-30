/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, {
  createElement,
  Fragment,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { IEntityField } from '../../types';
import LaunchIcon from '@material-ui/icons/Launch';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { EntityHeadSortable } from '~/application/modules/pages/Entity/components/EntityHeadSortable';
import styles from './styles';
import { EntityField } from '../EntityField';
import { observer } from 'mobx-react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import omit from 'ramda/es/omit';
import classnames from 'classnames';
import { Entity } from '~/application/modules';
import { ENTITY_SORT_DIRS } from "~/application/modules/pages/Entity/constants";

type IProps = WithStyles<typeof styles> & {
  isLoading: boolean;
  fields: IEntityField[];
  data: Record<string, string>[];
  url: string;
  sortBy: string;
  sortDir: typeof ENTITY_SORT_DIRS[keyof typeof ENTITY_SORT_DIRS];
  selected: any[];
  entity: Entity;
  extra:
    | (({
        id,
        onClose,
      }: {
        id: any;
        onClose: (id: any) => void;
      }) => JSX.Element)
    | null;
  canView: boolean;
  canEdit: boolean;
  canSelect?: boolean;
  setSelected: (items: any[]) => void;
  onSortChange: (field: string) => void;
  withToken?: (req: any, args: any) => void;
  onRowClick?: (id: any, event: MouseEvent<any>) => void;

  firstRow?: ReactNode;
  lastRow?: ReactNode;
  tableHead?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
};

const EntityList = observer(
  withStyles(styles)(
    ({
      classes,
      isLoading,
      fields,
      entity,
      data,
      url,
      extra,
      selected,
      sortBy,
      sortDir,
      canView,
      canEdit,
      canSelect,
      onSortChange,
      setSelected,
      withToken,
      onRowClick,
      before = null,
      after = null,
      firstRow = null,
      lastRow = null,
      tableHead = null,
    }: IProps) => {
      const [expanded, setExpanded] = useState<Record<any, boolean>>({});

      const visibleFields = useMemo(
        () => fields.filter((field) => !field.hideInList),
        [fields]
      );

      const history = useHistory();

      const onRowClicked = useCallback(
        (id: any, event: MouseEvent<any>) => {
          if (onRowClick) {
            return onRowClick(id, event);
          }

          if (extra) {
            return setExpanded({ ...expanded, [id]: !expanded[id] });
          }

          if (canView) {
            return history.push(`${url}/${id}`);
          }

          if (canEdit) {
            return history.push(`${url}/${id}/edit`);
          }
        },
        [
          canView,
          canEdit,
          history,
          url,
          extra,
          expanded,
          setExpanded,
          onRowClick,
        ]
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

      const colSpan = useMemo(
        () =>
          visibleFields.length +
          (canView ? 1 : 0) +
          (canEdit ? 1 : 0) +
          (canSelect ? 1 : 0) +
          (extra ? 1 : 0),
        [visibleFields, canEdit, canView, canSelect]
      );

      const onExtraClose = useCallback(
        (id) => setExpanded(omit([id], expanded)),
        [setExpanded, expanded]
      );

      if (isLoading) {
        return (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        );
      }

      return (
        <>
          {before}
          <TableContainer>
            <Table className={classes.table} stickyHeader size="medium">
              {tableHead || (
                <TableHead>
                  <TableRow>
                    {extra && <TableCell />}

                    {canSelect && (
                      <TableCell>
                        <Checkbox
                          onChange={onSelectAll}
                          checked={isAllSelected}
                        />
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

                    {canView && <TableCell />}
                    {canEdit && <TableCell />}
                  </TableRow>
                </TableHead>
              )}

              <TableBody>
                {firstRow}
                {data.map((entry, i) => (
                  <Fragment key={i}>
                    <TableRow hover>
                      {extra && (
                        <TableCell
                          onClick={(event) => onRowClicked(entry.id, event)}
                        >
                          {expanded[entry.id] ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </TableCell>
                      )}

                      {canSelect && (
                        <TableCell>
                          <Checkbox
                            checked={selected.includes(entry.id)}
                            onChange={(_, includes) =>
                              onSelect(entry.id, includes)
                            }
                          />
                        </TableCell>
                      )}

                      {visibleFields.map((field) => (
                        <TableCell
                          key={field.name}
                          onClick={(event) => onRowClicked(entry.id, event)}
                        >
                          <EntityField
                            name={field.name}
                            fields={fields}
                            data={entry}
                            withToken={withToken}
                            entity={entity}
                          />
                        </TableCell>
                      ))}

                      {canEdit && (
                        <TableCell
                          size="small"
                          align="right"
                          className={classes.button}
                        >
                          <Button
                            to={`${url}/${entry.id}/edit`}
                            component={RouterLink}
                          >
                            <EditIcon />
                          </Button>
                        </TableCell>
                      )}

                      {canView && (
                        <TableCell
                          size="small"
                          align="right"
                          className={classnames(
                            classes.button,
                            classes.button_active
                          )}
                        >
                          <Button
                            to={`${url}/${entry.id}/`}
                            component={RouterLink}
                          >
                            <LaunchIcon />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>

                    {!!extra && expanded[entry.id] && (
                      <TableRow>
                        <TableCell colSpan={colSpan}>
                          {createElement(extra, {
                            id: entry.id,
                            onClose: onExtraClose,
                          })}
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))}
                {lastRow}
              </TableBody>
            </Table>
          </TableContainer>
          {after}
        </>
      );
    }
  )
);

export { EntityList };
